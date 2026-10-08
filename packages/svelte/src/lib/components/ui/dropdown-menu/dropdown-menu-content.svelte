<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getDropdownMenuContext } from './context.js';

	let {
		class: className,
		children,
		style,
		...restProps
	}: HTMLAttributes<HTMLDivElement> = $props();

	const { menu } = getDropdownMenuContext();
</script>

<!-- Uses the native popover API (top layer), so no portal is needed. -->
<div
	{...restProps}
	{...menu.content}
	style="{menu.content.style}; {style ?? ''}"
	class={['content', className]}
>
	{@render children?.()}
</div>

<style>
	.content {
		min-width: var(--dui-dropdown-menu-min-width, 8rem);
		max-height: var(--melt-popover-available-height);
		margin: 0;
		padding: var(--dui-space-1);
		overflow-x: hidden;
		overflow-y: auto;
		border: 0;
		border-radius: var(--dui-dropdown-menu-radius, var(--dui-radius-md));
		background: var(--dui-dropdown-menu-bg, var(--dui-color-popover));
		color: var(--dui-dropdown-menu-fg, var(--dui-color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
			var(--dui-shadow-md);
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
