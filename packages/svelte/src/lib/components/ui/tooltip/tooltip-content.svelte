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
		--bg: var(--dui-tooltip-bg, var(--dui-color-primary));

		width: fit-content;
		max-width: var(--dui-tooltip-max-width, 20rem);
		margin: 0;
		padding: var(--dui-space-1-5) var(--dui-space-3);
		border: 0;
		border-radius: var(--dui-tooltip-radius, var(--dui-radius-md));
		background: var(--bg);
		color: var(--dui-tooltip-fg, var(--dui-color-primary-foreground));
		font-size: var(--dui-text-xs);
		line-height: var(--dui-text-xs-line-height);
		text-wrap: balance;
		overflow: visible;
		transition:
			opacity var(--dui-duration-fast) var(--dui-ease-out),
			scale var(--dui-duration-fast) var(--dui-ease-out);

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
		background: var(--bg);
	}
</style>
