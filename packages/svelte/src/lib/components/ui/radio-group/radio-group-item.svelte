<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { getRadioGroupContext } from './context.js';

	let {
		ref = $bindable(null),
		value,
		disabled = false,
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, 'type' | 'value' | 'name' | 'checked'> & {
		ref?: HTMLInputElement | null;
		value: string;
	} = $props();

	const group = getRadioGroupContext();
</script>

<input
	{...restProps}
	type="radio"
	bind:this={ref}
	name={group.name}
	{value}
	checked={group.value === value}
	disabled={group.disabled || disabled}
	onchange={() => (group.value = value)}
	class={['item', className]}
/>

<style>
	.item {
		--_size: var(--radio-size, 1rem);
		--_bg: var(--radio-bg, var(--color-control));
		--_border: var(--radio-border, var(--color-input));
		--_checked-bg: var(--radio-checked-bg, var(--color-primary));
		--_checked-fg: var(--radio-checked-fg, var(--color-primary-foreground));

		appearance: none;
		display: inline-grid;
		place-content: center;
		flex-shrink: 0;
		width: var(--_size);
		height: var(--_size);
		margin: 0;
		border: 1px solid var(--_border);
		border-radius: var(--radius-full);
		background: var(--_bg);
		box-shadow: var(--shadow-xs);
		cursor: pointer;
		outline: none;
		transition: box-shadow var(--duration-fast) var(--ease-out);

		/* The dot. */
		&::before {
			content: '';
			width: calc(var(--_size) / 2);
			height: calc(var(--_size) / 2);
			border-radius: var(--radius-full);
			background: var(--_checked-fg);
			scale: 0;
		}

		&:checked {
			border-color: var(--_checked-bg);
			background: var(--_checked-bg);

			&::before {
				scale: 1;
			}
		}

		&:focus-visible {
			border-color: var(--color-ring);
			box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
		}

		&[aria-invalid='true'] {
			border-color: var(--color-destructive);
			box-shadow: 0 0 0 var(--ring-width)
				color-mix(in oklch, var(--color-destructive) 20%, transparent);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
</style>
