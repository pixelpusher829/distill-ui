<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getDropdownMenuContext } from './context.js';

	let {
		checked = $bindable(false),
		disabled = false,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { checked?: boolean; disabled?: boolean } = $props();

	const { menu } = getDropdownMenuContext();
</script>

<!-- Stays open on select, so several options can be toggled in a row. -->
<div
	{...restProps}
	{...menu.getItem({ disabled, closeOnSelect: false, onSelect: () => (checked = !checked) })}
	role="menuitemcheckbox"
	aria-checked={checked}
	class={['item', className]}
>
	<svg class="check" viewBox="0 0 24 24" aria-hidden="true" data-checked={checked || undefined}>
		<path d="M20 6 9 17l-5-5" />
	</svg>
	{@render children?.()}
</div>

<style>
	.item {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1-5) var(--space-2) var(--space-1-5) var(--space-8);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		cursor: default;
		outline: none;
		user-select: none;

		&:focus {
			background: var(--color-accent);
			color: var(--color-accent-foreground);
		}

		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	.check {
		position: absolute;
		left: var(--space-2);
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		visibility: hidden;

		&[data-checked] {
			visibility: visible;
		}
	}
</style>
