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

<!--
	Options you can set from a parent or on the textarea itself:
	--dui-textarea-min-height, --dui-textarea-border, --dui-textarea-radius, --dui-textarea-bg
-->

<style>
	.textarea {
		display: flex;
		width: 100%;
		min-height: var(--dui-textarea-min-height, 4rem);
		/* Grows with its content in browsers that support it. */
		field-sizing: content;
		padding: var(--dui-space-2) var(--dui-space-2-5);
		border: 1px solid var(--dui-textarea-border, var(--dui-color-input));
		border-radius: var(--dui-textarea-radius, var(--dui-radius-md));
		background: var(--dui-textarea-bg, var(--dui-color-control));
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
