<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getSelectContext } from './context.js';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const { select } = getSelectContext();
</script>

<!-- Melt uses the native popover API (top layer), so no portal is needed. -->
<div {...restProps} {...select.content} class={['content', className]}>
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
		min-width: max(var(--select-content-min-width, 9rem), var(--melt-invoker-width));
		max-height: var(--melt-popover-available-height);
		overflow-x: hidden;
		outline: none;
		overflow-y: auto;
		border-radius: var(--select-content-radius, var(--radius-md));
		background: var(--select-content-bg, var(--color-popover));
		color: var(--select-content-fg, var(--color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--color-foreground) 10%, transparent),
			var(--shadow-md);
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);

		@starting-style {
			opacity: 0;
			scale: 0.95;
		}
	}

	.viewport {
		padding: var(--space-1);
	}
</style>
