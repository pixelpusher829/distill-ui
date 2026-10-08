<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { getAlertDialogContext } from './context.js';

	let {
		class: className,
		children,
		...restProps
	}: HTMLDialogAttributes & { children: Snippet } = $props();

	const { dialog, titleId, descriptionId } = getAlertDialogContext();
</script>

<!-- Melt uses a native <dialog> in the top layer, so no portal is needed. -->
<div {...dialog.overlay} class="overlay"></div>
<dialog
	{...restProps}
	{...dialog.content}
	role="alertdialog"
	class={['content', className]}
	aria-labelledby={titleId}
	aria-describedby={descriptionId}
>
	{@render children()}
</dialog>

<style>
	/* Melt closes the dialog on transitionend, so this animates with
	   transitions on [data-open] rather than the shared keyframes. */
	.overlay {
		position: fixed;
		inset: 0;
		width: auto;
		height: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: var(--dui-alert-dialog-overlay-bg, var(--dui-color-overlay));
		backdrop-filter: blur(4px);
		opacity: 0;
		transition: opacity var(--dui-duration-fast) var(--dui-ease-out);

		&[data-open] {
			opacity: 1;
		}
	}

	.content {
		display: grid;
		gap: var(--dui-space-6);
		width: 100%;
		max-width: min(var(--dui-alert-dialog-max-width, 32rem), calc(100% - var(--dui-space-8)));
		padding: var(--dui-alert-dialog-padding, var(--dui-space-6));
		border: 0;
		border-radius: var(--dui-alert-dialog-radius, var(--dui-radius-xl));
		background: var(--dui-alert-dialog-bg, var(--dui-color-popover));
		color: var(--dui-alert-dialog-fg, var(--dui-color-popover-foreground));
		box-shadow: 0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent);
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		outline: none;
		opacity: 0;
		scale: 0.95;
		transition:
			opacity var(--dui-duration-fast) var(--dui-ease-out),
			scale var(--dui-duration-fast) var(--dui-ease-out);

		&:not([open]) {
			display: none;
		}

		&[data-open] {
			opacity: 1;
			scale: 1;
		}

		&::backdrop {
			background: transparent;
		}
	}
</style>
