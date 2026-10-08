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
		--width: var(--dui-switch-width, 2rem);
		--height: var(--dui-switch-height, 1.15rem);
		--thumb-size: var(--dui-switch-thumb-size, 1rem);
		--track: var(--dui-switch-track, var(--dui-color-switch-track));
		--checked-track: var(--dui-switch-checked-track, var(--dui-color-primary));
		--thumb: var(--dui-switch-thumb, var(--dui-color-switch-thumb));
		--checked-thumb: var(--dui-switch-checked-thumb, var(--dui-color-switch-thumb-checked));

		appearance: none;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: var(--width);
		height: var(--height);
		margin: 0;
		border: 1px solid transparent;
		border-radius: var(--dui-radius-full);
		background: var(--track);
		box-shadow: var(--dui-shadow-xs);
		cursor: pointer;
		outline: none;
		transition:
			background-color var(--dui-duration-fast) var(--dui-ease-out),
			box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		/* The thumb. */
		&::before {
			content: '';
			width: var(--thumb-size);
			height: var(--thumb-size);
			border-radius: var(--dui-radius-full);
			background: var(--thumb);
			pointer-events: none;
			transition: translate var(--dui-duration-fast) var(--dui-ease-out);
		}

		&:checked {
			background: var(--checked-track);

			&::before {
				background: var(--checked-thumb);
				translate: calc(var(--width) - var(--thumb-size) - 2px) 0;
			}
		}

		&:dir(rtl):checked::before {
			translate: calc((var(--width) - var(--thumb-size) - 2px) * -1) 0;
		}

		&:focus-visible {
			border-color: var(--dui-color-ring);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}

	.switch[data-size='sm'] {
		--width: var(--dui-switch-width, 1.5rem);
		--height: var(--dui-switch-height, 0.875rem);
		--thumb-size: var(--dui-switch-thumb-size, 0.75rem);
	}
</style>
