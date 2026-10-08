<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		variant = 'default',
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		variant?: 'default' | 'destructive';
	} = $props();
</script>

<div
	{...restProps}
	bind:this={ref}
	role="alert"
	class={['alert', className]}
	data-variant={variant}
>
	{@render children?.()}
</div>

<style>
	.alert {
		position: relative;
		display: grid;
		grid-template-columns: 1fr;
		row-gap: var(--dui-space-0-5);
		width: 100%;
		padding: var(--dui-space-3) var(--dui-space-4);
		border: 1px solid var(--dui-alert-border, var(--dui-color-border));
		border-radius: var(--dui-alert-radius, var(--dui-radius-lg));
		background: var(--dui-alert-bg, var(--dui-color-card));
		color: var(--dui-alert-fg, var(--dui-color-card-foreground));
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);

		/* An optional icon passed as the first child gets its own column. */
		&:has(> :global(svg)) {
			grid-template-columns: auto 1fr;
			column-gap: var(--dui-space-2-5);
		}

		& > :global(svg) {
			grid-row: span 2;
			width: 1rem;
			height: 1rem;
			translate: 0 0.125rem;
			color: currentColor;
		}
	}

	.alert[data-variant='destructive'] {
		/* Pulled toward the foreground so the text passes AA contrast, as in Button. */
		color: var(
			--dui-alert-fg,
			color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground))
		);
	}
</style>
