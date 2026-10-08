<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getPopoverContext } from './context.js';

	let {
		class: className,
		children,
		style,
		...restProps
	}: HTMLAttributes<HTMLDivElement> = $props();

	const { popover } = getPopoverContext();
</script>

<!-- Uses the native popover API (top layer), so no portal is needed. -->
<div
	{...restProps}
	{...popover.content}
	role="dialog"
	style="{popover.content.style}; {style ?? ''}"
	class={['content', className]}
>
	{@render children?.()}
</div>

<style>
	.content {
		width: var(--popover-width, 18rem);
		margin: 0;
		padding: var(--popover-padding, var(--space-4));
		border: 0;
		border-radius: var(--popover-radius, var(--radius-md));
		background: var(--popover-bg, var(--color-popover));
		color: var(--popover-fg, var(--color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--color-foreground) 10%, transparent),
			var(--shadow-md);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		outline: none;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);

		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}
</style>
