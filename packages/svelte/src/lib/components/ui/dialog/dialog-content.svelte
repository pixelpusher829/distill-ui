<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { getDialogContext } from './context.js';

	let {
		class: className,
		children,
		showCloseButton = true,
		...restProps
	}: HTMLDialogAttributes & { children: Snippet; showCloseButton?: boolean } = $props();

	const { dialog, titleId, descriptionId } = getDialogContext();
</script>

<!-- Melt uses a native <dialog> in the top layer, so no portal is needed. -->
<div {...dialog.overlay} class="overlay"></div>
<dialog
	{...restProps}
	{...dialog.content}
	class={['content', className]}
	aria-labelledby={titleId}
	aria-describedby={descriptionId}
>
	{@render children()}
	{#if showCloseButton}
		<button type="button" class="close" onclick={() => (dialog.open = false)}>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M18 6 6 18" />
				<path d="m6 6 12 12" />
			</svg>
			<span class="sr-only">Close</span>
		</button>
	{/if}
</dialog>

<!--
	Options you can set from a parent or on the dialog content itself:
	--dui-dialog-overlay-bg, --dui-dialog-max-width, --dui-dialog-padding, --dui-dialog-radius, --dui-dialog-bg, --dui-dialog-fg
-->

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
		background: var(--dui-dialog-overlay-bg, var(--dui-color-overlay));
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
		max-width: min(var(--dui-dialog-max-width, 28rem), calc(100% - var(--dui-space-8)));
		padding: var(--dui-dialog-padding, var(--dui-space-6));
		border: 0;
		border-radius: var(--dui-dialog-radius, var(--dui-radius-xl));
		background: var(--dui-dialog-bg, var(--dui-color-popover));
		color: var(--dui-dialog-fg, var(--dui-color-popover-foreground));
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

	.close {
		position: absolute;
		top: var(--dui-space-4);
		right: var(--dui-space-4);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border: none;
		border-radius: var(--dui-radius-md);
		background: transparent;
		color: var(--dui-color-foreground);
		cursor: pointer;
		opacity: 0.7;
		transition: opacity var(--dui-duration-fast) var(--dui-ease-out);

		&:hover {
			opacity: 1;
			background: var(--dui-color-muted);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}

		svg {
			width: 1rem;
			height: 1rem;
			fill: none;
			stroke: currentColor;
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}
</style>
