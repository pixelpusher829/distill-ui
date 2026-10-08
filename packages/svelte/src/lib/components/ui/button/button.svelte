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

<!--
	Options you can set from a parent or on the button itself:
	--dui-button-bg, --dui-button-fg, --dui-button-hover-bg, --dui-button-border,
	--dui-button-radius, --dui-button-height
-->

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--dui-space-1-5);
		flex-shrink: 0;
		height: var(--dui-button-height, 2.25rem);
		padding-inline: var(--dui-space-2-5);
		border: 1px solid var(--dui-button-border, transparent);
		border-radius: var(--dui-button-radius, var(--dui-radius-md));
		background: var(--dui-button-bg, var(--dui-color-primary));
		background-clip: padding-box;
		color: var(--dui-button-fg, var(--dui-color-primary-foreground));
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
			background: var(--dui-button-hover-bg, var(--dui-color-primary-hover));
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

		/* Icons passed in as children. */
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
		background: var(--dui-button-bg, var(--dui-color-secondary));
		color: var(--dui-button-fg, var(--dui-color-secondary-foreground));

		&:hover {
			background: var(--dui-button-hover-bg, var(--dui-color-secondary-hover));
		}
	}

	.button[data-variant='outline'] {
		border-color: var(--dui-button-border, var(--dui-color-input));
		background: var(--dui-button-bg, var(--dui-color-control));
		color: var(--dui-button-fg, var(--dui-color-foreground));
		box-shadow: var(--dui-shadow-xs);

		&:hover,
		&[aria-expanded='true'] {
			background: var(--dui-button-hover-bg, var(--dui-color-control-hover));
		}
	}

	.button[data-variant='ghost'] {
		background: var(--dui-button-bg, transparent);
		color: var(--dui-button-fg, var(--dui-color-foreground));

		&:hover {
			background: var(--dui-button-hover-bg, var(--dui-color-muted));
		}
	}

	.button[data-variant='destructive'] {
		background: var(--dui-button-bg, var(--dui-color-destructive-subtle));
		color: var(--dui-button-fg, var(--dui-color-destructive-text));

		&:hover {
			background: var(--dui-button-hover-bg, var(--dui-color-destructive-subtle-hover));
		}
	}

	.button[data-variant='link'] {
		background: var(--dui-button-bg, transparent);
		color: var(--dui-button-fg, var(--dui-color-primary));
		text-underline-offset: 4px;

		&:hover {
			background: var(--dui-button-hover-bg, transparent);
			text-decoration: underline;
		}
	}

	/* Sizes */
	.button[data-size='sm'] {
		height: var(--dui-button-height, 2rem);
		gap: var(--dui-space-1);
	}

	.button[data-size='lg'] {
		height: var(--dui-button-height, 2.5rem);
	}

	.button[data-size='icon'] {
		width: var(--dui-button-height, 2.25rem);
		padding-inline: 0;
	}
</style>
