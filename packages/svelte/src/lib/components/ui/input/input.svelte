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
		--bg: var(--dui-input-bg, var(--dui-color-control));
		--border: var(--dui-input-border, var(--dui-color-input));
		--height: var(--dui-input-height, 2.25rem);
		--padding-x: var(--dui-input-padding-x, var(--dui-space-2-5));
		--radius: var(--dui-input-radius, var(--dui-radius-md));

		width: 100%;
		min-width: 0;
		height: var(--height);
		padding: var(--dui-space-1) var(--padding-x);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
		color: var(--dui-color-foreground);
		font: inherit;
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		box-shadow: var(--dui-shadow-xs);
		outline: none;
		transition:
			border-color var(--dui-duration-fast) var(--dui-ease-out),
			box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		&::placeholder {
			color: var(--dui-color-muted-foreground);
		}

		&::file-selector-button {
			height: 1.75rem;
			margin-inline-end: var(--dui-space-2);
			padding: 0;
			border: 0;
			background: transparent;
			color: var(--dui-color-foreground);
			font: inherit;
			font-size: var(--dui-text-sm);
			font-weight: var(--dui-font-weight-medium);
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
