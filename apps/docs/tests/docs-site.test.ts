import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { components, guides } from '../src/lib/docs/components.js';

// Every page of the docs site loads and passes axe in both themes.
const pages = [
	'/',
	...guides.map((g) => g.href),
	...components.map((c) => `/docs/components/${c.slug}`)
];

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
	await page.goto('/docs');
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
	await page.goto('/docs/components/dialog');
	await page.waitForLoadState('networkidle');
	await page.getByRole('tab', { name: 'Code' }).first().click();
	const code = page.getByRole('tabpanel').filter({ hasText: 'Dialog.Root' });
	await expect(code).toContainText("import * as Dialog from '#lib/components/ui/dialog/index.js';");
	await code.getByRole('button', { name: 'Copy code' }).click();
	await expect(code.getByRole('button', { name: 'Copied' })).toBeVisible();
	expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('<Dialog.Root>');
});

test('the manual install tab lists every file the CLI would copy', async ({ page }) => {
	await page.goto('/docs/components/dialog');
	await page.waitForLoadState('networkidle');
	await page.getByRole('tab', { name: 'Manual' }).click();
	await expect(page.getByText('src/lib/components/ui/dialog/dialog-content.svelte')).toBeVisible();
	await expect(page.getByText('src/lib/components/ui/dialog/index.ts')).toBeVisible();
});

test('the docs menu folds on phones', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/docs');
	await page.waitForLoadState('networkidle');
	const menu = page.getByRole('navigation', { name: 'Docs' });
	await expect(menu.getByRole('link', { name: 'Installation' })).toBeHidden();
	await menu.getByText('Menu', { exact: true }).click();
	await expect(menu.getByRole('link', { name: 'Installation' })).toBeVisible();
});

test('the theme builder recolors the previews and the theme files', async ({ page }) => {
	await page.goto('/docs/theme-builder');
	await page.waitForLoadState('networkidle');
	const lightFile = page.locator('figure', { hasText: 'themes/light.css' });
	await expect(lightFile).toContainText('--dui-color-primary: oklch(0.205 0 0);');

	await page.getByRole('button', { name: 'Violet' }).click();
	await page.getByRole('radio', { name: 'Slate' }).click();
	await expect(lightFile).toContainText('--dui-color-primary: oklch(0.55 0.2 285);');
	await expect(lightFile).toContainText('--dui-color-muted-foreground: oklch(0.556 0.02 255);');

	const save = page
		.getByRole('region', { name: 'Light preview' })
		.getByRole('button', { name: 'Save' });
	await expect(save).toHaveCSS('background-color', /oklch\(0\.55 0\.2 285\)/);
});

test('the framework switch shows Vue code and demos, and remembers the choice', async ({
	page
}) => {
	await page.goto('/docs/components/dialog');
	await page.waitForLoadState('networkidle');
	await page.getByRole('button', { name: 'Vue', exact: true }).click();
	await expect(page.getByText('Reka UI Dialog')).toBeVisible();
	await page.getByRole('tab', { name: 'Code' }).first().click();
	await expect(page.getByText("import * as Dialog from '@/components/ui/dialog';")).toBeVisible();

	// The Vue demo mounts in the preview and works.
	await page.getByRole('tab', { name: 'Preview' }).first().click();
	await page.getByTestId('preview').getByRole('button', { name: 'Edit profile' }).click();
	await expect(page.getByRole('dialog', { name: 'Edit profile' })).toBeVisible();
	await page.keyboard.press('Escape');

	await page.goto('/docs/installation');
	await expect(page.getByText('Add distill-ui to a Vue 3 or Nuxt project.')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Vue', exact: true })).toHaveAttribute(
		'aria-pressed',
		'true'
	);
});

test('every component page passes axe with the Vue demos', async ({ page }) => {
	test.slow();
	await page.addInitScript(() => localStorage.setItem('framework', 'vue'));
	for (const { slug, name } of components) {
		await page.goto(`/docs/components/${slug}`);
		await expect(page.getByRole('button', { name: 'Vue', exact: true })).toHaveAttribute(
			'aria-pressed',
			'true'
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
