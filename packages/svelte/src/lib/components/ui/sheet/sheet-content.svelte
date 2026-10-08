<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import { getSheetContext } from './context.js';

	let {
		class: className,
		children,
		showCloseButton = true,
		side = 'right',
		...restProps
	}: HTMLDialogAttributes & {
		children: Snippet;
		showCloseButton?: boolean;
		side?: 'top' | 'right' | 'bottom' | 'left';
	} = $props();

	const { dialog, titleId, descriptionId } = getSheetContext();
</script>

<!-- Melt uses a native <dialog> in the top layer, so no portal is needed. -->
<div {...dialog.overlay} class="overlay"></div>
<dialog
	{...restProps}
	{...dialog.content}
	class={['content', className]}
	data-side={side}
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
		background: var(--dui-sheet-overlay-bg, var(--dui-color-overlay));
		backdrop-filter: blur(4px);
		opacity: 0;
		transition: opacity var(--dui-duration-fast) var(--dui-ease-out);

		&[data-open] {
			opacity: 1;
		}
	}

	.content {
		--size: var(--dui-sheet-size, 24rem);

		position: fixed;
		display: flex;
		flex-direction: column;
		gap: var(--dui-space-4);
		width: auto;
		max-width: none;
		height: auto;
		max-height: none;
		margin: 0;
		padding: var(--dui-sheet-padding, var(--dui-space-6));
		border: 0;
		background: var(--dui-sheet-bg, var(--dui-color-background));
		color: var(--dui-sheet-fg, var(--dui-color-foreground));
		box-shadow:
			0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
			var(--dui-shadow-lg);
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		outline: none;
		transition: translate var(--dui-duration-slow) var(--dui-ease-in-out);

		&:not([open]) {
			display: none;
		}

		&::backdrop {
			background: transparent;
		}
	}

	/* Each side pins the sheet to that edge and slides it in from off-screen. */
	.content[data-side='right'] {
		inset: 0 0 0 auto;
		width: min(var(--size), 75%);
		translate: 100% 0;
	}

	.content[data-side='left'] {
		inset: 0 auto 0 0;
		width: min(var(--size), 75%);
		translate: -100% 0;
	}

	.content[data-side='top'] {
		inset: 0 0 auto 0;
		translate: 0 -100%;
	}

	.content[data-side='bottom'] {
		inset: auto 0 0 0;
		translate: 0 100%;
	}

	/* After the side rules, so it wins when open. */
	.content[data-open] {
		translate: 0 0;
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
