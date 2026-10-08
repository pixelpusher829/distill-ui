<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		size = 'md',
		class: className,
		...restProps
	}: Omit<HTMLInputAttributes, 'type' | 'size'> & {
		ref?: HTMLInputElement | null;
		size?: 'sm' | 'md';
	} = $props();
</script>

<!-- A native checkbox with role="switch": screen readers announce it as on/off. -->
<input
	{...restProps}
	type="checkbox"
	role="switch"
	bind:this={ref}
	bind:checked
	class={['switch', className]}
	data-size={size}
/>

<style>
	.switch {
		--_width: var(--switch-width, 2rem);
		--_height: var(--switch-height, 1.15rem);
		--_thumb-size: var(--switch-thumb-size, 1rem);
		--_track: var(--switch-track, var(--color-switch-track));
		--_checked-track: var(--switch-checked-track, var(--color-primary));
		--_thumb: var(--switch-thumb, var(--color-switch-thumb));
		--_checked-thumb: var(--switch-checked-thumb, var(--color-switch-thumb-checked));

		appearance: none;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: var(--_width);
		height: var(--_height);
		margin: 0;
		border: 1px solid transparent;
		border-radius: var(--radius-full);
		background: var(--_track);
		box-shadow: var(--shadow-xs);
		cursor: pointer;
		outline: none;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);

		/* The thumb. */
		&::before {
			content: '';
			width: var(--_thumb-size);
			height: var(--_thumb-size);
			border-radius: var(--radius-full);
			background: var(--_thumb);
			pointer-events: none;
			transition: translate var(--duration-fast) var(--ease-out);
		}

		&:checked {
			background: var(--_checked-track);

			&::before {
				background: var(--_checked-thumb);
				translate: calc(var(--_width) - var(--_thumb-size) - 2px) 0;
			}
		}

		&:dir(rtl):checked::before {
			translate: calc((var(--_width) - var(--_thumb-size) - 2px) * -1) 0;
		}

		&:focus-visible {
			border-color: var(--color-ring);
			box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}

	.switch[data-size='sm'] {
		--_width: var(--switch-width, 1.5rem);
		--_height: var(--switch-height, 0.875rem);
		--_thumb-size: var(--switch-thumb-size, 0.75rem);
	}
</style>
