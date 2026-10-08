<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...restProps
	}: Omit<HTMLTextareaAttributes, 'children'> & { ref?: HTMLTextAreaElement | null } = $props();
</script>

<textarea {...restProps} bind:this={ref} bind:value class={['textarea', className]}></textarea>

<style>
	.textarea {
		--_bg: var(--textarea-bg, var(--color-control));
		--_border: var(--textarea-border, var(--color-input));
		--_min-height: var(--textarea-min-height, 4rem);
		--_radius: var(--textarea-radius, var(--radius-md));

		display: flex;
		width: 100%;
		min-height: var(--_min-height);
		/* Grows with its content in browsers that support it. */
		field-sizing: content;
		padding: var(--space-2) var(--space-2-5);
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
