<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getSelectContext } from './context.js';

	let {
		class: className,
		value,
		label,
		disabled = false,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		value: string;
		label?: string;
		disabled?: boolean;
	} = $props();

	const { select } = getSelectContext();
</script>

<!-- Melt's Select has no disabled-option support: this item looks disabled and ignores
     pointer clicks, but keyboard navigation still lands on it and Enter still selects it. -->
<div
	{...restProps}
	{...select.getOption(value, label)}
	class={['item', className]}
	aria-disabled={disabled || undefined}
	data-disabled={disabled ? '' : undefined}
>
	<span class="text">{label ?? value}</span>
	{#if select.isSelected(value)}
		<svg class="indicator" viewBox="0 0 24 24" aria-hidden="true">
			<path d="M20 6 9 17l-5-5" />
		</svg>
	{/if}
</div>

<style>
	.item {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
		padding-block: var(--space-1-5);
		padding-inline: var(--space-2) var(--space-8);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		cursor: default;
		user-select: none;
		outline: none;

		&[data-highlighted] {
			background: var(--select-item-highlight-bg, var(--color-accent));
			color: var(--select-item-highlight-fg, var(--color-accent-foreground));
		}

		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	.text {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--space-2);
		white-space: nowrap;
	}

	.indicator {
		position: absolute;
		right: var(--space-2);
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		pointer-events: none;
	}
</style>
