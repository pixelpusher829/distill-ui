<script lang="ts">
	import { Dialog as DialogPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay class="dui-dialog-overlay" />
	<DialogPrimitive.Content bind:ref class={['dui-dialog-content', className]} {...restProps}>
		{@render children()}
		{#if showCloseButton}
			<DialogPrimitive.Close class="dui-dialog-close">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
				<span class="dui-sr-only">Close</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>

<style>
	:global(.dui-dialog-overlay) {
		position: fixed;
		inset: 0;
		isolation: isolate;
		z-index: var(--z-overlay);
		background: var(--dialog-overlay-bg, var(--color-overlay));
		backdrop-filter: blur(4px);
		animation-duration: var(--duration-fast);

		&[data-state='open'] {
			animation-name: distill-fade-in;
		}

		&[data-state='closed'] {
			animation-name: distill-fade-out;
		}
	}

	:global(.dui-dialog-content) {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: var(--z-modal);
		display: grid;
		gap: var(--space-6);
		width: 100%;
		max-width: min(var(--dialog-max-width, 28rem), calc(100% - var(--space-8)));
		padding: var(--dialog-padding, var(--space-6));
		border-radius: var(--dialog-radius, var(--radius-xl));
		background: var(--dialog-bg, var(--color-popover));
		color: var(--dialog-fg, var(--color-popover-foreground));
		box-shadow: 0 0 0 1px color-mix(in oklch, var(--color-foreground) 10%, transparent);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		transform: translate(-50%, -50%);
		outline: none;
		animation-duration: var(--duration-fast);

		&[data-state='open'] {
			animation-name: distill-zoom-in;
		}

		&[data-state='closed'] {
			animation-name: distill-zoom-out;
		}
	}

	:global(.dui-dialog-close) {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border: none;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--color-foreground);
		cursor: pointer;
		opacity: 0.7;
		transition: opacity var(--duration-fast) var(--ease-out);

		&:hover {
			opacity: 1;
			background: var(--color-muted);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
		}

		:global(svg) {
			width: 1rem;
			height: 1rem;
			fill: none;
			stroke: currentColor;
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
	}

	:global(.dui-sr-only) {
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
