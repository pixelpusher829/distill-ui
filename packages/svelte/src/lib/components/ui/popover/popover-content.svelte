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
		width: var(--dui-popover-width, 18rem);
		margin: 0;
		padding: var(--dui-popover-padding, var(--dui-space-4));
		border: 0;
		border-radius: var(--dui-popover-radius, var(--dui-radius-md));
		background: var(--dui-popover-bg, var(--dui-color-popover));
		color: var(--dui-popover-fg, var(--dui-color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
			var(--dui-shadow-md);
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		outline: none;
		transition:
			opacity var(--dui-duration-fast) var(--dui-ease-out),
			scale var(--dui-duration-fast) var(--dui-ease-out);

		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}
</style>
