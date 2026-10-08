<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export type ButtonVariant =
		'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
	export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

	type SharedProps = {
		variant?: ButtonVariant;
		size?: ButtonSize;
		ref?: HTMLElement | null;
	};

	export type ButtonProps = SharedProps &
		(
			| (HTMLButtonAttributes & { href?: undefined })
			| (HTMLAnchorAttributes & { href: string; type?: never; disabled?: never })
		);
</script>

<script lang="ts">
	let {
		variant = 'default',
		size = 'md',
		ref = $bindable(null),
		class: className,
		href,
		type = 'button',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		class={['button', className]}
		data-variant={variant}
		data-size={size}
		{href}
		{...restProps as HTMLAnchorAttributes}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={['button', className]}
		data-variant={variant}
		data-size={size}
		{type}
		{...restProps as HTMLButtonAttributes}
	>
		{@render children?.()}
	</button>
{/if}

<style>
	.button {
		--_bg: var(--button-bg, var(--color-primary));
		--_fg: var(--button-fg, var(--color-primary-foreground));
		--_border: var(--button-border, transparent);
		--_hover-bg: var(--button-hover-bg, color-mix(in oklch, var(--_bg) 80%, transparent));
		--_hover-fg: var(--button-hover-fg, var(--_fg));
		--_height: var(--button-height, 2.25rem);
		--_padding-x: var(--button-padding-x, var(--space-2-5));
		--_radius: var(--button-radius, var(--radius-md));

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-1-5);
		flex-shrink: 0;
		height: var(--_height);
		padding-inline: var(--_padding-x);
		border: 1px solid var(--_border);
		border-radius: var(--_radius);
		background: var(--_bg);
		background-clip: padding-box;
		color: var(--_fg);
		font: inherit;
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		outline: none;
		user-select: none;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);

		&:hover {
			background: var(--_hover-bg);
			color: var(--_hover-fg);
		}

		&:focus-visible {
			border-color: var(--color-ring);
			box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
		}

		&:active:not([aria-haspopup]) {
			translate: 0 1px;
		}

		&:disabled,
		&[aria-disabled='true'] {
			pointer-events: none;
			opacity: 0.5;
		}

		& :global(svg) {
			flex-shrink: 0;
			pointer-events: none;
		}

		& :global(svg:not([width])) {
			width: 1rem;
			height: 1rem;
		}
	}

	/* Variants */
	.button[data-variant='secondary'] {
		--_bg: var(--button-bg, var(--color-secondary));
		--_fg: var(--button-fg, var(--color-secondary-foreground));
	}

	.button[data-variant='outline'] {
		--_bg: var(--button-bg, var(--color-control));
		--_fg: var(--button-fg, var(--color-foreground));
		--_border: var(--button-border, var(--color-input));
		--_hover-bg: var(--button-hover-bg, var(--color-control-hover));
		--_hover-fg: var(--button-hover-fg, var(--color-foreground));
		box-shadow: var(--shadow-xs);

		&[aria-expanded='true'] {
			background: var(--_hover-bg);
		}
	}

	.button[data-variant='ghost'] {
		--_bg: var(--button-bg, transparent);
		--_fg: var(--button-fg, var(--color-foreground));
		--_hover-bg: var(--button-hover-bg, var(--color-muted));
		--_hover-fg: var(--button-hover-fg, var(--color-foreground));
	}

	.button[data-variant='destructive'] {
		--_bg: var(--button-bg, color-mix(in oklch, var(--color-destructive) 10%, transparent));
		/* Pulled slightly toward the foreground color so the text passes AA contrast on its tint. */
		--_fg: var(
			--button-fg,
			color-mix(in oklch, var(--color-destructive) 80%, var(--color-foreground))
		);
		--_hover-bg: var(
			--button-hover-bg,
			color-mix(in oklch, var(--color-destructive) 20%, transparent)
		);
	}

	.button[data-variant='link'] {
		--_bg: var(--button-bg, transparent);
		--_fg: var(--button-fg, var(--color-primary));
		--_hover-bg: var(--button-hover-bg, transparent);
		text-underline-offset: 4px;

		&:hover {
			text-decoration: underline;
		}
	}

	/* Sizes */
	.button[data-size='sm'] {
		--_height: var(--button-height, 2rem);
		--_padding-x: var(--button-padding-x, var(--space-2-5));
		gap: var(--space-1);
	}

	.button[data-size='lg'] {
		--_height: var(--button-height, 2.5rem);
		--_padding-x: var(--button-padding-x, var(--space-2-5));
	}

	.button[data-size='icon'] {
		--_padding-x: var(--button-padding-x, 0);
		width: var(--_height);
	}
</style>
