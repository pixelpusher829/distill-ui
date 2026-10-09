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
