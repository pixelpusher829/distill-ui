<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		value = $bindable(),
		files = $bindable(),
		type,
		class: className,
		...restProps
	}: HTMLInputAttributes & { ref?: HTMLInputElement | null; files?: FileList } = $props();
</script>

{#if type === 'file'}
	<input {...restProps} type="file" bind:this={ref} bind:files class={['input', className]} />
{:else}
	<input {...restProps} {type} bind:this={ref} bind:value class={['input', className]} />
{/if}

<style>
	.input {
		--_bg: var(--input-bg, var(--color-control));
		--_border: var(--input-border, var(--color-input));
		--_height: var(--input-height, 2.25rem);
		--_padding-x: var(--input-padding-x, var(--space-2-5));
		--_radius: var(--input-radius, var(--radius-md));

		width: 100%;
		min-width: 0;
		height: var(--_height);
		padding: var(--space-1) var(--_padding-x);
		border: 1px solid var(--_border);
		border-radius: var(--_radius);
		background: var(--_bg);
		color: var(--color-foreground);
		font: inherit;
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		box-shadow: var(--shadow-xs);
		outline: none;
		transition:
			border-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);

		&::placeholder {
			color: var(--color-muted-foreground);
		}

		&::file-selector-button {
			height: 1.75rem;
			margin-inline-end: var(--space-2);
			padding: 0;
			border: 0;
			background: transparent;
			color: var(--color-foreground);
			font: inherit;
			font-size: var(--text-sm);
			font-weight: var(--font-weight-medium);
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
