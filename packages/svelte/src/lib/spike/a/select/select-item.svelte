<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item bind:ref {value} {label} {...restProps}>
	{#snippet child({ props, selected, highlighted })}
		<div {...props} class={['item', className]}>
			<span class="text">
				{#if childrenProp}
					{@render childrenProp({ selected, highlighted })}
				{:else}
					{label || value}
				{/if}
			</span>
			{#if selected}
				<svg class="indicator" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M20 6 9 17l-5-5" />
				</svg>
			{/if}
		</div>
	{/snippet}
</SelectPrimitive.Item>

<style>
	.item {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
		padding-block: var(--space-1-5);
		padding-inline: var(--space-2) var(--space-8);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		cursor: default;
		user-select: none;
		outline: none;

		&[data-highlighted] {
			background: var(--select-item-highlight-bg, var(--color-accent));
			color: var(--select-item-highlight-fg, var(--color-accent-foreground));
		}

		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	.text {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--space-2);
		white-space: nowrap;
	}

	.indicator {
		position: absolute;
		right: var(--space-2);
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		pointer-events: none;
	}
</style>
