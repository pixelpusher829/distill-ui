<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		class={['dui-select-content', className]}
		{...restProps}
	>
		<SelectPrimitive.Viewport class="dui-select-viewport">
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>

<style>
	:global(.dui-select-content) {
		position: relative;
		z-index: var(--z-popover);
		min-width: var(--select-content-min-width, 9rem);
		max-height: var(--bits-select-content-available-height);
		overflow-x: hidden;
		overflow-y: auto;
		border-radius: var(--select-content-radius, var(--radius-md));
		background: var(--select-content-bg, var(--color-popover));
		color: var(--select-content-fg, var(--color-popover-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--color-foreground) 10%, transparent),
			var(--shadow-md);
		transform-origin: var(--bits-select-content-transform-origin);
		animation-duration: var(--duration-fast);
		animation-timing-function: var(--ease-out);

		&[data-state='open'] {
			animation-name: distill-zoom-in;
		}

		&[data-state='closed'] {
			animation-name: distill-zoom-out;
		}

		&[data-state='open'][data-side='bottom'] {
			animation-name: distill-zoom-in, distill-slide-in-from-top;
		}

		&[data-state='open'][data-side='top'] {
			animation-name: distill-zoom-in, distill-slide-in-from-bottom;
		}
	}

	:global(.dui-select-viewport) {
		width: 100%;
		min-width: var(--bits-select-anchor-width);
		padding: var(--space-1);
		scroll-margin-block: var(--space-1);
	}
</style>
