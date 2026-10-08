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
		--bg: var(--dui-button-bg, var(--dui-color-primary));
		--fg: var(--dui-button-fg, var(--dui-color-primary-foreground));
		--border: var(--dui-button-border, transparent);
		--hover-bg: var(--dui-button-hover-bg, color-mix(in oklch, var(--bg) 80%, transparent));
		--hover-fg: var(--dui-button-hover-fg, var(--fg));
		--height: var(--dui-button-height, 2.25rem);
		--padding-x: var(--dui-button-padding-x, var(--dui-space-2-5));
		--radius: var(--dui-button-radius, var(--dui-radius-md));

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--dui-space-1-5);
		flex-shrink: 0;
		height: var(--height);
		padding-inline: var(--padding-x);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
		background-clip: padding-box;
		color: var(--fg);
		font: inherit;
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		font-weight: var(--dui-font-weight-medium);
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		outline: none;
		user-select: none;
		transition:
			background-color var(--dui-duration-fast) var(--dui-ease-out),
			color var(--dui-duration-fast) var(--dui-ease-out),
			box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		&:hover {
			background: var(--hover-bg);
			color: var(--hover-fg);
		}

		&:focus-visible {
			border-color: var(--dui-color-ring);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
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
		--bg: var(--dui-button-bg, var(--dui-color-secondary));
		--fg: var(--dui-button-fg, var(--dui-color-secondary-foreground));
	}

	.button[data-variant='outline'] {
		--bg: var(--dui-button-bg, var(--dui-color-control));
		--fg: var(--dui-button-fg, var(--dui-color-foreground));
		--border: var(--dui-button-border, var(--dui-color-input));
		--hover-bg: var(--dui-button-hover-bg, var(--dui-color-control-hover));
		--hover-fg: var(--dui-button-hover-fg, var(--dui-color-foreground));
		box-shadow: var(--dui-shadow-xs);

		&[aria-expanded='true'] {
			background: var(--hover-bg);
		}
	}

	.button[data-variant='ghost'] {
		--bg: var(--dui-button-bg, transparent);
		--fg: var(--dui-button-fg, var(--dui-color-foreground));
		--hover-bg: var(--dui-button-hover-bg, var(--dui-color-muted));
		--hover-fg: var(--dui-button-hover-fg, var(--dui-color-foreground));
	}

	.button[data-variant='destructive'] {
		--bg: var(--dui-button-bg, color-mix(in oklch, var(--dui-color-destructive) 10%, transparent));
		/* Pulled slightly toward the foreground color so the text passes AA contrast on its tint. */
		--fg: var(
			--dui-button-fg,
			color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground))
		);
		--hover-bg: var(
			--dui-button-hover-bg,
			color-mix(in oklch, var(--dui-color-destructive) 20%, transparent)
		);
	}

	.button[data-variant='link'] {
		--bg: var(--dui-button-bg, transparent);
		--fg: var(--dui-button-fg, var(--dui-color-primary));
		--hover-bg: var(--dui-button-hover-bg, transparent);
		text-underline-offset: 4px;

		&:hover {
			text-decoration: underline;
		}
	}

	/* Sizes */
	.button[data-size='sm'] {
		--height: var(--dui-button-height, 2rem);
		--padding-x: var(--dui-button-padding-x, var(--dui-space-2-5));
		gap: var(--dui-space-1);
	}

	.button[data-size='lg'] {
		--height: var(--dui-button-height, 2.5rem);
		--padding-x: var(--dui-button-padding-x, var(--dui-space-2-5));
	}

	.button[data-size='icon'] {
		--padding-x: var(--dui-button-padding-x, 0);
		width: var(--height);
	}
</style>
