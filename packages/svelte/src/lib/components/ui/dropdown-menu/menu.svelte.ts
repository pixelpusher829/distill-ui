import { BasePopover, type PopoverProps } from 'melt/builders';

/*
 * Melt has no menu builder, so this adds one on top of Melt's popover, which already handles
 * positioning, Escape, outside clicks and returning focus to the trigger. This file adds the
 * WAI-ARIA menu button pattern: roles, arrow keys, Home/End and typeahead.
 * https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/
 */

type MenuProps = Pick<PopoverProps, 'open' | 'onOpenChange' | 'floatingConfig'>;

const ITEM_SELECTOR = '[role^="menuitem"]:not([aria-disabled="true"])';

export class Menu extends BasePopover {
	#triggerId: string;
	#typeahead = '';
	#typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

	constructor(props: MenuProps = {}) {
		// We move focus ourselves when the menu opens (first or last item), so tell Melt not to.
		super({ ...props, focus: { onOpen: () => null } });
		this.#triggerId = `${this.ids.popover}-trigger`;
	}

	get trigger() {
		const invoker = this.getInvoker();
		return {
			...invoker,
			id: this.#triggerId,
			'aria-haspopup': 'menu' as const,
			'aria-expanded': this.open,
			'aria-controls': this.ids.popover,
			'data-open': this.open ? '' : undefined,
			onclick: (e: MouseEvent) => {
				invoker.onclick(e);
				if (this.open) this.#focusItem('first');
			},
			onkeydown: (e: KeyboardEvent & { currentTarget: HTMLElement }) => {
				if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
				e.preventDefault();
				this.triggerEl = e.currentTarget;
				this.open = true;
				this.#focusItem(e.key === 'ArrowUp' ? 'last' : 'first');
			}
		};
	}

	get content() {
		return {
			...this.getPopover(),
			role: 'menu' as const,
			'aria-labelledby': this.#triggerId,
			'aria-orientation': 'vertical' as const,
			onkeydown: (e: KeyboardEvent & { currentTarget: HTMLElement }) => this.#onKeydown(e)
		};
	}

	/** Props for one item. `onSelect` runs on click, Enter or Space. */
	getItem({
		disabled = false,
		closeOnSelect = true,
		onSelect
	}: {
		disabled?: boolean;
		closeOnSelect?: boolean;
		onSelect?: () => void;
	} = {}) {
		return {
			tabindex: -1,
			'aria-disabled': disabled ? ('true' as const) : undefined,
			'data-disabled': disabled ? '' : undefined,
			onclick: () => {
				if (disabled) return;
				onSelect?.();
				if (closeOnSelect) this.open = false;
			},
			onkeydown: (e: KeyboardEvent & { currentTarget: HTMLElement }) => {
				if (e.key !== 'Enter' && e.key !== ' ') return;
				e.preventDefault();
				e.currentTarget.click();
			},
			// Moving the pointer over an item focuses it, so keyboard and mouse share one highlight.
			onpointermove: (e: PointerEvent & { currentTarget: HTMLElement }) => {
				if (disabled) return;
				e.currentTarget.focus({ preventScroll: true });
			},
			onpointerleave: (e: PointerEvent & { currentTarget: HTMLElement }) => {
				if (document.activeElement === e.currentTarget) this.#contentEl()?.focus();
			}
		};
	}

	#contentEl() {
		return document.getElementById(this.ids.popover);
	}

	#items() {
		return [...(this.#contentEl()?.querySelectorAll<HTMLElement>(ITEM_SELECTOR) ?? [])];
	}

	#focusItem(which: 'first' | 'last') {
		// Wait a tick for the popover to open before moving focus into it.
		setTimeout(() => {
			const items = this.#items();
			(which === 'first' ? items[0] : items.at(-1))?.focus();
		});
	}

	#onKeydown(e: KeyboardEvent) {
		const items = this.#items();
		const index = items.indexOf(document.activeElement as HTMLElement);
		const move = (i: number) => {
			e.preventDefault();
			items[(i + items.length) % items.length]?.focus();
		};

		if (e.key === 'ArrowDown') return move(index + 1);
		if (e.key === 'ArrowUp') return move(index < 0 ? -1 : index - 1);
		if (e.key === 'Home') return move(0);
		if (e.key === 'End') return move(-1);
		if (e.key === 'Tab') return (this.open = false);

		// Typeahead: typing letters jumps to the next item that starts with them.
		if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			clearTimeout(this.#typeaheadTimer);
			this.#typeahead += e.key.toLowerCase();
			this.#typeaheadTimer = setTimeout(() => (this.#typeahead = ''), 500);
			const ordered = [...items.slice(index + 1), ...items.slice(0, index + 1)];
			const match = ordered.find((item) =>
				item.textContent?.trim().toLowerCase().startsWith(this.#typeahead)
			);
			match?.focus();
		}
	}
}
