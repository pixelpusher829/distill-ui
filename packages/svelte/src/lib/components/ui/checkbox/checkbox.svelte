<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, 'type'> & { ref?: HTMLInputElement | null } = $props();
</script>

<!-- A native checkbox: keyboard, forms and screen readers work without extra code. -->
<input
	{...restProps}
	type="checkbox"
	bind:this={ref}
	bind:checked
	bind:indeterminate
	class={['checkbox', className]}
/>

<style>
	.checkbox {
		--size: var(--dui-checkbox-size, 1rem);
		--bg: var(--dui-checkbox-bg, var(--dui-color-control));
		--border: var(--dui-checkbox-border, var(--dui-color-input));
		--checked-bg: var(--dui-checkbox-checked-bg, var(--dui-color-primary));
		--checked-fg: var(--dui-checkbox-checked-fg, var(--dui-color-primary-foreground));
		--radius: var(--dui-checkbox-radius, 4px);

		appearance: none;
		display: inline-grid;
		place-content: center;
		flex-shrink: 0;
		width: var(--size);
		height: var(--size);
		margin: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
		color: var(--checked-fg);
		box-shadow: var(--dui-shadow-xs);
		cursor: pointer;
		outline: none;
		transition: box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		/* The check mark: an SVG used as a mask, so it takes the text color. */
		&::before {
			content: '';
			width: calc(var(--size) * 0.875);
			height: calc(var(--size) * 0.875);
			background: currentColor;
			mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
				center / contain no-repeat;
			scale: 0;
		}

		&:checked,
		&:indeterminate {
			border-color: var(--checked-bg);
			background: var(--checked-bg);

			&::before {
				scale: 1;
			}
		}

		&:indeterminate::before {
			mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
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
