import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// The same checks as apps/docs/tests/components.test.ts, so the Vue components behave like the
// Svelte ones: keyboard follows the WAI-ARIA patterns, axe passes, in both themes.
const themes = ['light', 'dark'] as const;

async function expectNoAxeViolations(page: Page, disableRules: string[] = []) {
	const results = await new AxeBuilder({ page })
		.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
		.disableRules(disableRules)
		.analyze();
	expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.target}`)).toEqual([]);
}

for (const theme of themes) {
	test.describe(`${theme} theme`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.evaluate((t) => (document.documentElement.dataset.theme = t), theme);
			await expect(page.locator('body')).toHaveCSS(
				'background-color',
				theme === 'dark' ? 'oklch(0.145 0 0)' : 'oklch(1 0 0)'
			);
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
			// While the list is open, Reka hides the rest of the page from screen readers and keeps
			// focus in the list (like Radix and shadcn-vue). axe only knows that pattern for dialogs.
			await expectNoAxeViolations(page, ['aria-hidden-focus']);

			// Apple is highlighted on open; Grapes is disabled and must be skipped.
			await expect(page.getByRole('option', { name: 'Apple', exact: true })).toBeFocused();
			// Reka moves focus a tick after each key, so check each step rather than firing all three
			// at machine speed (a person can't type fast enough to notice).
			for (const name of ['Banana', 'Blueberry', 'Pineapple']) {
				await page.keyboard.press('ArrowDown');
				await expect(page.locator('[data-highlighted]')).toHaveText(name);
			}
			await page.keyboard.press('Enter');
			await expect(trigger).toHaveText('Pineapple');
		});

		test('select ignores clicks on disabled items', async ({ page }) => {
			const trigger = page.getByRole('combobox', { name: 'Favorite fruit' });
			await trigger.click();
			await page.getByRole('option', { name: 'Grapes' }).click({ force: true });
			// The list stays open (and hides the page) until closed, so close it before checking.
			await page.keyboard.press('Escape');
			await expect(trigger).toHaveText('Select a fruit');
		});

		test('checkbox and switch toggle with Space', async ({ page }) => {
			const checkbox = page.getByRole('checkbox', { name: 'Accept terms and conditions' });
			await checkbox.focus();
			await page.keyboard.press('Space');
			await expect(checkbox).toBeChecked();

			const toggle = page.getByRole('switch', { name: 'Airplane mode' });
			await toggle.focus();
			await page.keyboard.press('Space');
			await expect(toggle).toBeChecked();
		});

		test('radio group moves with arrow keys and updates its value', async ({ page }) => {
			const group = page.getByRole('radiogroup', { name: 'Spacing' });
			await expect(group.getByRole('radio', { name: 'Comfortable' })).toBeChecked();
			await group.getByRole('radio', { name: 'Comfortable' }).focus();
			await page.keyboard.press('ArrowDown');
			await expect(group.getByRole('radio', { name: 'Compact' })).toBeChecked();
			await expect(group.getByRole('radio', { name: 'Compact' })).toBeFocused();
			await expect(page.getByText('Selected: compact')).toBeVisible();
		});

		test('avatar shows the image once loaded and the fallback when it fails', async ({ page }) => {
			const section = page.getByTestId('avatar');
			await expect(section.getByRole('img', { name: 'Profile picture' })).toBeVisible();
			await expect(section.getByText('JB')).toBeHidden();
			await expect(section.getByRole('img', { name: 'Missing picture' })).toBeHidden();
			await expect(section.getByText('CN')).toBeVisible();
		});

		test('alert dialog ignores outside clicks and closes with Cancel', async ({ page }) => {
			const trigger = page.getByRole('button', { name: 'Delete account' });
			await trigger.click();
			const dialog = page.getByRole('alertdialog', { name: 'Are you absolutely sure?' });
			await expect(dialog).toBeVisible();
			await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused();
			await expectNoAxeViolations(page);

			await page.mouse.click(5, 5);
			await expect(dialog).toBeVisible();
			await dialog.getByRole('button', { name: 'Cancel' }).press('Enter');
			await expect(dialog).toBeHidden();
			await expect(trigger).toBeFocused();
		});

		test('sheet opens from the side and closes on Escape', async ({ page }) => {
			const trigger = page.getByRole('button', { name: 'Open right' });
			await trigger.click();
			const sheet = page.getByRole('dialog', { name: 'Edit profile' });
			await expect(sheet).toBeVisible();
			await expectNoAxeViolations(page);
			await page.keyboard.press('Escape');
			await expect(sheet).toBeHidden();
			await expect(trigger).toBeFocused();
		});

		test('dropdown menu follows the menu button keyboard pattern', async ({ page }) => {
			const trigger = page.getByRole('button', { name: 'Open menu' });
			await trigger.focus();
			await page.keyboard.press('ArrowDown');
			const menu = page.getByRole('menu');
			await expect(menu).toBeVisible();
			await expect(trigger).toHaveAttribute('aria-expanded', 'true');
			await expect(page.getByRole('menuitem', { name: /Profile/ })).toBeFocused();
			await expectNoAxeViolations(page);

			// Team is disabled and skipped.
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await expect(page.getByRole('menuitem', { name: 'Settings' })).toBeFocused();
			await page.keyboard.press('End');
			await expect(page.getByRole('menuitem', { name: 'Log out' })).toBeFocused();
			await page.keyboard.press('b');
			await expect(page.getByRole('menuitem', { name: 'Billing' })).toBeFocused();
			await page.keyboard.press('Enter');
			await expect(menu).toBeHidden();
			await expect(page.getByText('Last action: billing.')).toBeVisible();
			await expect(trigger).toBeFocused();

			await page.keyboard.press('ArrowUp');
			await expect(page.getByRole('menuitem', { name: 'Log out' })).toBeFocused();
			await page.keyboard.press('Escape');
			await expect(menu).toBeHidden();
			await expect(trigger).toBeFocused();
		});

		test('dropdown checkbox item toggles and stays open', async ({ page }) => {
			await page.getByRole('button', { name: 'Open menu' }).click();
			const item = page.getByRole('menuitemcheckbox', { name: 'Status bar' });
			await expect(item).toHaveAttribute('aria-checked', 'true');
			await item.click();
			await expect(item).toHaveAttribute('aria-checked', 'false');
			await expect(page.getByRole('menu')).toBeVisible();
		});

		test('popover opens on click and closes on Escape', async ({ page }) => {
			const trigger = page.getByRole('button', { name: 'Open popover' });
			await trigger.click();
			await expect(page.getByRole('dialog').getByText('Dimensions')).toBeVisible();
			await expectNoAxeViolations(page);
			await page.keyboard.press('Escape');
			await expect(page.getByText('Dimensions')).toBeHidden();
		});

		test('tooltip shows on keyboard focus', async ({ page }) => {
			const trigger = page.getByRole('button', { name: 'Hover me' });
			// Reka closes a tooltip when the page scrolls, so bring it into view and let the scroll
			// event fire (it lands a frame later) before focusing.
			await trigger.scrollIntoViewIfNeeded();
			await page.evaluate(
				() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
			);
			await trigger.focus();
			const tip = page.getByRole('tooltip');
			await expect(tip).toHaveText('Add to library');
			await expect(trigger).toHaveAttribute('aria-describedby', (await tip.getAttribute('id'))!);
			await expectNoAxeViolations(page);
			await page.keyboard.press('Escape');
			await expect(tip).toBeHidden();
		});

		test('toast appears, runs its action and closes', async ({ page }) => {
			await page.getByRole('button', { name: 'Show toast' }).click();
			const t = page.getByRole('alert').filter({ hasText: 'Event has been created' });
			await expect(t).toBeVisible();
			await expectNoAxeViolations(page);
			await t.getByRole('button', { name: 'Undo' }).click();
			await expect(t).toBeHidden();
			const undone = page.getByRole('alert').filter({ hasText: 'Undone' });
			await expect(undone).toBeVisible();
			await undone.getByRole('button', { name: 'Close' }).click();
			await expect(undone).toBeHidden();
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
	await page.goto('/');
	const button = page.getByRole('button', { name: 'Overridden from a parent' });
	await expect(button).toHaveCSS('border-radius', '9999px');
});
