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
		min-width: var(--dropdown-menu-min-width, 8rem);
		max-height: var(--melt-popover-available-height);
		margin: 0;
		padding: var(--space-1);
		overflow-x: hidden;
		overflow-y: auto;
		border: 0;
		border-radius: var(--dropdown-menu-radius, var(--radius-md));
		background: var(--dropdown-menu-bg, var(--color-popover));
		color: var(--dropdown-menu-fg, var(--color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--color-foreground) 10%, transparent),
			var(--shadow-md);
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
