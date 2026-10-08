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

<style>
	.card {
		/* Inherited by the card's parts (header, content, footer) for their padding. */
		--_card-spacing: var(--card-spacing, var(--space-6));
		--_card-title-size: var(--text-base);

		display: flex;
		flex-direction: column;
		gap: var(--_card-spacing);
		padding-block: var(--_card-spacing);
		overflow: hidden;
		border-radius: var(--card-radius, var(--radius-xl));
		background: var(--card-bg, var(--color-card));
		color: var(--card-fg, var(--color-card-foreground));
		font-size: var(--text-sm);
		box-shadow:
			0 0 0 1px var(--card-border, color-mix(in oklch, var(--color-foreground) 10%, transparent)),
			var(--shadow-xs);
	}

	.card[data-size='sm'] {
		--_card-spacing: var(--card-spacing, var(--space-4));
		--_card-title-size: var(--text-sm);
	}
</style>
