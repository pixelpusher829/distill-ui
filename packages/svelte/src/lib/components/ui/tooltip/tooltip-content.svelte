<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getTooltipContext } from './context.js';

	let {
		class: className,
		children,
		style,
		...restProps
	}: HTMLAttributes<HTMLDivElement> = $props();

	const { tooltip } = getTooltipContext();
</script>

<div
	{...restProps}
	{...tooltip.content}
	style="{tooltip.content.style}; {style ?? ''}"
	class={['content', className]}
>
	{@render children?.()}
	<div {...tooltip.arrow} class="arrow"></div>
</div>

<style>
	.content {
		--_bg: var(--tooltip-bg, var(--color-primary));

		width: fit-content;
		max-width: var(--tooltip-max-width, 20rem);
		margin: 0;
		padding: var(--space-1-5) var(--space-3);
		border: 0;
		border-radius: var(--tooltip-radius, var(--radius-md));
		background: var(--_bg);
		color: var(--tooltip-fg, var(--color-primary-foreground));
		font-size: var(--text-xs);
		line-height: var(--text-xs-line-height);
		text-wrap: balance;
		overflow: visible;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);

		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}

	/* Melt positions the arrow; we only draw it, as a rotated square in the tooltip's color. */
	.arrow {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 2px;
		background: var(--_bg);
	}
</style>
