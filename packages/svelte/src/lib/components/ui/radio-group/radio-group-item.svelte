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

<!--
	Options you can set from a parent or on the radio group item itself:
	--dui-radio-size, --dui-radio-border, --dui-radio-bg, --dui-radio-checked-fg, --dui-radio-checked-bg
-->

<style>
	.item {
		/* The size is reused below for the mark, so it is set once here. */
		--size: var(--dui-radio-size, 1rem);

		appearance: none;
		display: inline-grid;
		place-content: center;
		flex-shrink: 0;
		width: var(--size);
		height: var(--size);
		margin: 0;
		border: 1px solid var(--dui-radio-border, var(--dui-color-input));
		border-radius: var(--dui-radius-full);
		background: var(--dui-radio-bg, var(--dui-color-control));
		box-shadow: var(--dui-shadow-xs);
		cursor: pointer;
		outline: none;
		transition: box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		/* The dot. */
		&::before {
			content: '';
			width: calc(var(--size) / 2);
			height: calc(var(--size) / 2);
			border-radius: var(--dui-radius-full);
			background: var(--dui-radio-checked-fg, var(--dui-color-primary-foreground));
			scale: 0;
		}

		&:checked {
			border-color: var(--dui-radio-checked-bg, var(--dui-color-primary));
			background: var(--dui-radio-checked-bg, var(--dui-color-primary));

			&::before {
				scale: 1;
			}
		}

		&:focus-visible {
			border-color: var(--dui-color-ring);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}

		&[aria-invalid='true'] {
			border-color: var(--dui-color-destructive);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-destructive) 20%, transparent);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}
</style>
