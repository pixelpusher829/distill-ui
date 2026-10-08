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
		--_size: var(--checkbox-size, 1rem);
		--_bg: var(--checkbox-bg, var(--color-control));
		--_border: var(--checkbox-border, var(--color-input));
		--_checked-bg: var(--checkbox-checked-bg, var(--color-primary));
		--_checked-fg: var(--checkbox-checked-fg, var(--color-primary-foreground));
		--_radius: var(--checkbox-radius, 4px);

		appearance: none;
		display: inline-grid;
		place-content: center;
		flex-shrink: 0;
		width: var(--_size);
		height: var(--_size);
		margin: 0;
		border: 1px solid var(--_border);
		border-radius: var(--_radius);
		background: var(--_bg);
		color: var(--_checked-fg);
		box-shadow: var(--shadow-xs);
		cursor: pointer;
		outline: none;
		transition: box-shadow var(--duration-fast) var(--ease-out);

		/* The check mark: an SVG used as a mask, so it takes the text color. */
		&::before {
			content: '';
			width: calc(var(--_size) * 0.875);
			height: calc(var(--_size) * 0.875);
			background: currentColor;
			mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
				center / contain no-repeat;
			scale: 0;
		}

		&:checked,
		&:indeterminate {
			border-color: var(--_checked-bg);
			background: var(--_checked-bg);

			&::before {
				scale: 1;
			}
		}

		&:indeterminate::before {
			mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
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
