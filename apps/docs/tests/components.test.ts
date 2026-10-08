import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Quality bar from PLAN-svelte.md: keyboard behavior matches Bits UI, axe passes, and it
// holds in both themes. Each test runs once per theme.
const themes = ['light', 'dark'] as const;

async function expectNoAxeViolations(page: Page) {
	const results = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.analyze();
	expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
}

for (const theme of themes) {
	test.describe(`${theme} theme`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/components');
			await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
		});

		test('page passes axe', async ({ page }) => {
			await expectNoAxeViolations(page);
		});

		test('dialog traps focus, closes on Escape and returns focus', async ({ page }) => {
			const trigger = page.getByRole('button', { name: 'Edit profile' });
			await trigger.focus();
			await page.keyboard.press('Enter');
			const dialog = page.getByRole('dialog', { name: 'Edit profile' });
			await expect(dialog).toBeVisible();
			await expectNoAxeViolations(page);

			for (let i = 0; i < 5; i++) await page.keyboard.press('Tab');
			expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);

			await page.keyboard.press('Escape');
			await expect(dialog).toBeHidden();
			await expect(trigger).toBeFocused();
		});

		test('select skips disabled items and picks with the keyboard', async ({ page }) => {
			const trigger = page.getByRole('combobox', { name: 'Favorite fruit' });
			await trigger.focus();
			await page.keyboard.press('Enter');
			await expect(page.getByRole('listbox')).toBeVisible();
			await expectNoAxeViolations(page);

			// Apple is highlighted on open; Grapes is disabled and must be skipped.
			for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowDown');
			await expect(page.locator('[data-highlighted]')).toHaveText('Pineapple');
			await page.keyboard.press('Enter');
			await expect(trigger).toHaveText('Pineapple');
		});

		test('select ignores clicks on disabled items', async ({ page }) => {
			const trigger = page.getByRole('combobox', { name: 'Favorite fruit' });
			await trigger.click();
			await page.getByRole('option', { name: 'Grapes' }).click({ force: true });
			await expect(trigger).toHaveText('Select a fruit');
		});

		test('tabs move with arrow keys and skip disabled tabs', async ({ page }) => {
			await page.getByRole('tab', { name: 'Account' }).focus();
			await page.keyboard.press('ArrowRight');
			await expect(page.getByRole('tab', { name: 'Password' })).toBeFocused();
			await expect(page.getByText('Change your password here.')).toBeVisible();
			await page.keyboard.press('ArrowRight');
			await expect(page.getByRole('tab', { name: 'Account' })).toBeFocused();
		});
	});
}

test('custom properties set on a parent override the component', async ({ page }) => {
	await page.goto('/components');
	const button = page.getByRole('button', { name: 'Overridden from a parent' });
	await expect(button).toHaveCSS('border-radius', '9999px');
});
