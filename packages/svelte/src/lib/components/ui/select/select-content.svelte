<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getSelectContext } from './context.js';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const ctx = getSelectContext();
</script>

<!-- Melt uses the native popover API (top layer), so no portal is needed. -->
<div
	{...restProps}
	{...ctx.select.content}
	aria-labelledby={ctx.hasLabel ? ctx.labelId : undefined}
	class={['content', className]}
>
	<div class="viewport">
		{@render children?.()}
	</div>
</div>

<style>
	/* Melt positions with floating-ui and the popover API; open animation uses @starting-style
	   because the popover goes from display:none, and Melt has no exit-animation hook here. */
	.content {
		margin: 0;
		padding: 0;
		border: 0;
		min-width: max(var(--dui-select-content-min-width, 9rem), var(--melt-invoker-width));
		max-height: var(--melt-popover-available-height);
		overflow-x: hidden;
		outline: none;
		overflow-y: auto;
		border-radius: var(--dui-select-content-radius, var(--dui-radius-md));
		background: var(--dui-select-content-bg, var(--dui-color-popover));
		color: var(--dui-select-content-fg, var(--dui-color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
			var(--dui-shadow-md);
		transition:
			opacity var(--dui-duration-fast) var(--dui-ease-out),
			scale var(--dui-duration-fast) var(--dui-ease-out);

		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}

	.viewport {
		padding: var(--dui-space-1);
	}
</style>
