import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { components, docsPaths } from '../src/lib/docs/components.js';

// Every page of the docs site loads and passes axe in both themes. The Vue pages are checked below.
const pages = ['/', ...docsPaths.map((path) => `/svelte${path}`)];

for (const theme of ['light', 'dark'] as const) {
	test(`every docs page passes axe (${theme})`, async ({ page }) => {
		test.slow();
		await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
		for (const path of pages) {
			const response = await page.goto(path);
			expect(response?.status(), path).toBe(200);
			await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
				.analyze();
			expect(
				results.violations.map((v) => `${path} ${v.id}: ${v.nodes[0]?.target}`),
				path
			).toEqual([]);
		}
	});
}

test('the theme toggle switches and remembers the theme', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'light' });
	await page.goto('/svelte/docs');
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: 'Switch to dark mode' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.reload();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible();
});

test('component pages show the code with project imports and copy it', async ({
	page,
	context
}) => {
	await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	await page.goto('/svelte/docs/components/dialog');
	await page.waitForLoadState('networkidle');
	await page.getByRole('tab', { name: 'Code' }).first().click();
	const code = page.getByRole('tabpanel').filter({ hasText: 'Dialog.Root' });
	await expect(code).toContainText("import * as Dialog from '#lib/components/ui/dialog/index.js';");
	await code.getByRole('button', { name: 'Copy code' }).click();
	await expect(code.getByRole('button', { name: 'Copied' })).toBeVisible();
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('<Dialog.Root>');
});

test('the manual install tab lists every file the CLI would copy', async ({ page }) => {
	await page.goto('/svelte/docs/components/dialog');
	await page.waitForLoadState('networkidle');
	await page.getByRole('tab', { name: 'Manual' }).click();
	await expect(page.getByText('src/lib/components/ui/dialog/dialog-content.svelte')).toBeVisible();
	await expect(page.getByText('src/lib/components/ui/dialog/index.ts')).toBeVisible();
});

test('the docs menu folds on phones', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/svelte/docs');
	await page.waitForLoadState('networkidle');
	const menu = page.getByRole('navigation', { name: 'Docs' });
	await expect(menu.getByRole('link', { name: 'Installation' })).toBeHidden();
	await menu.getByText('Menu', { exact: true }).click();
	await expect(menu.getByRole('link', { name: 'Installation' })).toBeVisible();
});

test('the theme builder recolors the previews and the seeds', async ({ page }) => {
	await page.goto('/svelte/docs/theme-builder');
	await page.waitForLoadState('networkidle');
	const file = page.locator('figure', { hasText: 'tokens.css' });
	await expect(file).toContainText('--dui-primary: var(--dui-blue);');
	const save = page
		.getByRole('region', { name: 'Light preview' })
		.getByRole('button', { name: 'Save' });
	const before = await save.evaluate((el) => getComputedStyle(el).backgroundColor);

	await page.getByRole('button', { name: 'Violet' }).click();
	await page.getByRole('radio', { name: 'Stone' }).click();
	await expect(file).toContainText('--dui-primary: var(--dui-violet);');
	await expect(file).toContainText('--dui-neutral: var(--dui-gray-stone);');

	// Colors worked out with relative color syntax may be serialized as oklab(), so check the
	// lightness (primary-500) and that the color changed rather than an exact string.
	await expect(save).toHaveCSS('background-color', /^okl(ab|ch)\(0\.53 /);
	await expect(save).not.toHaveCSS('background-color', before);
});

test('the framework switch links to the Vue page, and the choice is remembered', async ({
	page
}) => {
	await page.goto('/svelte/docs/components/dialog');
	await page.waitForLoadState('networkidle');
	await page.getByRole('link', { name: 'Vue', exact: true }).click();
	await expect(page).toHaveURL('/vue/docs/components/dialog');
	await expect(page.getByText('Reka UI Dialog')).toBeVisible();
	await page.getByRole('tab', { name: 'Code' }).first().click();
	await expect(page.getByText("import * as Dialog from '@/components/ui/dialog';")).toBeVisible();

	// The Vue demo mounts in the preview and works.
	await page.getByRole('tab', { name: 'Preview' }).first().click();
	await page.getByTestId('preview').getByRole('button', { name: 'Edit profile' }).click();
	await expect(page.getByRole('dialog', { name: 'Edit profile' })).toBeVisible();
	await page.keyboard.press('Escape');

	// Links stay on Vue, and the home page picks up the choice.
	await page
		.getByRole('navigation', { name: 'Docs' })
		.getByRole('link', { name: 'Installation' })
		.click();
	await expect(page).toHaveURL('/vue/docs/installation');
	await expect(page.getByText('Add distill-ui to a Vue 3 or Nuxt project.')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Vue', exact: true })).toHaveAttribute(
		'aria-current',
		'page'
	);
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/the way Vue intended/, {
		useInnerText: true
	});
	await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute(
		'href',
		'/vue/docs/installation'
	);
});

test('each docs page is prerendered once per framework', async ({ request }) => {
	// The preview only serves files the build wrote, so a page missing from the build is a 404.
	for (const framework of ['svelte', 'vue']) {
		for (const path of docsPaths) {
			const response = await request.get(`/${framework}${path}`, { maxRedirects: 0 });
			expect(response.status(), `/${framework}${path}`).toBe(200);
		}
	}

	for (const path of ['/svelte/docs/installation', '/vue/docs/installation']) {
		const html = await (await request.get(path)).text();
		const name = path.startsWith('/vue') ? 'Vue' : 'Svelte';
		expect(html, path).toContain(`<title>Installation · distill-ui for ${name}</title>`);
		expect(html, path).toContain(
			`<link rel="canonical" href="https://distill-ui.vercel.app${path}"`
		);
	}
	const sitemap = await (await request.get('/sitemap.xml')).text();
	expect(sitemap).toContain('/svelte/docs/components/dialog</loc>');
	expect(sitemap).toContain('/vue/docs/components/dialog</loc>');
});

test('the old /docs URLs redirect to the Svelte pages', async ({ page }) => {
	await page.goto('/docs/components/dialog');
	await expect(page).toHaveURL('/svelte/docs/components/dialog');
	await page.goto('/docs');
	await expect(page).toHaveURL('/svelte/docs');
});

test('every component page passes axe with the Vue demos', async ({ page }) => {
	test.slow();
	for (const { slug, name } of components) {
		await page.goto(`/vue/docs/components/${slug}`);
		await expect(page.getByRole('link', { name: 'Vue', exact: true })).toHaveAttribute(
			'aria-current',
			'page'
		);
		await expect(
			page.getByText(name === 'Toast' ? 'Our own toast store' : /Reka UI|Native|Plain HTML/).first()
		).toBeVisible();
		await expect(page.getByTestId('preview').locator('.vue-demo > *').first()).toBeAttached();
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
		expect(
			results.violations.map((v) => `${slug} ${v.id}: ${v.nodes[0]?.target}`),
			slug
		).toEqual([]);
	}
});

test('the home page swaps its words, examples and color for Vue', async ({ page }) => {
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	const heading = page.getByRole('heading', { level: 1 });
	await expect(heading).toHaveText(/the way Svelte intended/, { useInnerText: true });
	const svelteAccent = await page.locator('.accent').evaluate((el) => getComputedStyle(el).color);

	await page.getByRole('button', { name: 'Vue', exact: true }).click();
	await expect(heading).toHaveText(/the way Vue intended/, { useInnerText: true });
	await expect(page.getByText('In Button.vue, which lives in your project')).toBeVisible();
	await expect(page.getByText('In button.svelte, which lives in your project')).toBeHidden();
	const vueAccent = await page.locator('.accent').evaluate((el) => getComputedStyle(el).color);
	expect(vueAccent).not.toBe(svelteAccent);

	// The choice is applied before the page paints on the next visit.
	await page.reload();
	await expect(heading).toHaveText(/the way Vue intended/, { useInnerText: true });
});
