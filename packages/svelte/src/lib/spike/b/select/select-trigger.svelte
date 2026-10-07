<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = 'md',
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & { size?: 'sm' | 'md' } = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	class={['dui-select-trigger', className]}
	data-size={size}
	{...restProps}
>
	{@render children?.()}
	<svg class="dui-select-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg
	>
</SelectPrimitive.Trigger>

<style>
	:global(.dui-select-trigger) {
		--_height: var(--select-trigger-height, 2.25rem);

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-1-5);
		width: var(--select-trigger-width, fit-content);
		height: var(--_height);
		padding-block: var(--space-2);
		padding-inline: var(--space-2-5) var(--space-2);
		border: 1px solid var(--select-trigger-border, var(--color-input));
		border-radius: var(--select-trigger-radius, var(--radius-md));
		background: var(--select-trigger-bg, transparent);
		color: var(--color-foreground);
		box-shadow: var(--shadow-xs);
		font: inherit;
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		white-space: nowrap;
		cursor: pointer;
		outline: none;
		transition:
			color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);

		&[data-size='sm'] {
			--_height: var(--select-trigger-height, 2rem);
		}

		&:focus-visible {
			border-color: var(--color-ring);
			box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
		}

		&[data-placeholder] {
			color: var(--color-muted-foreground);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&[aria-invalid='true'] {
			border-color: var(--color-destructive);
		}
	}

	:global(.dui-select-icon) {
		flex-shrink: 0;
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: var(--color-muted-foreground);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		pointer-events: none;
	}
</style>
