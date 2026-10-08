<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		size = 'md',
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		size?: 'sm' | 'md';
	} = $props();
</script>

<div {...restProps} bind:this={ref} class={['card', className]} data-size={size}>
	{@render children?.()}
</div>

<!--
	Options you can set from a parent or on the card itself:
	--dui-card-spacing, --dui-card-radius, --dui-card-bg, --dui-card-fg, --dui-card-border
-->

<style>
	.card {
		/* Inherited by the card's parts (header, content, footer) for their padding. */
		--card-spacing: var(--dui-card-spacing, var(--dui-space-6));
		--card-title-size: var(--dui-text-base);

		display: flex;
		flex-direction: column;
		gap: var(--card-spacing);
		padding-block: var(--card-spacing);
		overflow: hidden;
		border-radius: var(--dui-card-radius, var(--dui-radius-xl));
		background: var(--dui-card-bg, var(--dui-color-card));
		color: var(--dui-card-fg, var(--dui-color-card-foreground));
		font-size: var(--dui-text-sm);
		box-shadow:
			0 0 0 1px
				var(--dui-card-border, color-mix(in oklch, var(--dui-color-foreground) 10%, transparent)),
			var(--dui-shadow-xs);
	}

	.card[data-size='sm'] {
		--card-spacing: var(--dui-card-spacing, var(--dui-space-4));
		--card-title-size: var(--dui-text-sm);
	}
</style>
