<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';

	export type BadgeProps = { variant?: BadgeVariant; ref?: HTMLElement | null } & (
		| (HTMLAttributes<HTMLSpanElement> & { href?: undefined })
		| (HTMLAnchorAttributes & { href: string })
	);
</script>

<script lang="ts">
	let {
		variant = 'default',
		ref = $bindable(null),
		href,
		class: className,
		children,
		...restProps
	}: BadgeProps = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{...restProps}
	bind:this={ref}
	{href}
	class={['badge', className]}
	data-variant={variant}
>
	{@render children?.()}
</svelte:element>

<!--
	Options you can set from a parent or on the badge itself:
	--dui-badge-bg, --dui-badge-fg, --dui-badge-hover-bg, --dui-badge-border, --dui-badge-radius
-->

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--dui-space-1);
		flex-shrink: 0;
		width: fit-content;
		height: 1.25rem;
		padding: var(--dui-space-0-5) var(--dui-space-2);
		overflow: hidden;
		border: 1px solid var(--dui-badge-border, transparent);
		border-radius: var(--dui-badge-radius, var(--dui-radius-full));
		background: var(--dui-badge-bg, var(--dui-color-primary));
		color: var(--dui-badge-fg, var(--dui-color-primary-foreground));
		font-size: var(--dui-text-xs);
		line-height: var(--dui-text-xs-line-height);
		font-weight: var(--dui-font-weight-medium);
		white-space: nowrap;
		text-decoration: none;
		outline: none;
		transition:
			background-color var(--dui-duration-fast) var(--dui-ease-out),
			box-shadow var(--dui-duration-fast) var(--dui-ease-out);

		/* Only links react to hover. */
		&[href]:hover {
			background: var(--dui-badge-hover-bg, var(--dui-color-primary-hover));
		}

		&:focus-visible {
			border-color: var(--dui-color-ring);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}

		& :global(svg) {
			flex-shrink: 0;
			width: 0.75rem;
			height: 0.75rem;
			pointer-events: none;
		}
	}

	.badge[data-variant='secondary'] {
		background: var(--dui-badge-bg, var(--dui-color-secondary));
		color: var(--dui-badge-fg, var(--dui-color-secondary-foreground));

		&[href]:hover {
			background: var(--dui-badge-hover-bg, var(--dui-color-secondary-hover));
		}
	}

	.badge[data-variant='outline'] {
		border-color: var(--dui-badge-border, var(--dui-color-border));
		background: var(--dui-badge-bg, transparent);
		color: var(--dui-badge-fg, var(--dui-color-foreground));

		&[href]:hover {
			background: var(--dui-badge-hover-bg, var(--dui-color-muted));
		}
	}

	.badge[data-variant='ghost'] {
		background: var(--dui-badge-bg, transparent);
		color: var(--dui-badge-fg, var(--dui-color-foreground));

		&[href]:hover {
			background: var(--dui-badge-hover-bg, var(--dui-color-muted));
		}
	}

	.badge[data-variant='destructive'] {
		background: var(--dui-badge-bg, var(--dui-color-destructive-subtle));
		color: var(--dui-badge-fg, var(--dui-color-destructive-text));

		&[href]:hover {
			background: var(--dui-badge-hover-bg, var(--dui-color-destructive-subtle-hover));
		}
	}

	.badge[data-variant='link'] {
		background: var(--dui-badge-bg, transparent);
		color: var(--dui-badge-fg, var(--dui-color-primary));
		text-underline-offset: 4px;

		&[href]:hover {
			background: var(--dui-badge-hover-bg, transparent);
			text-decoration: underline;
		}
	}
</style>
