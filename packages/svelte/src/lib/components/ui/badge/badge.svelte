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

<style>
	.badge {
		--_bg: var(--badge-bg, var(--color-primary));
		--_fg: var(--badge-fg, var(--color-primary-foreground));
		--_border: var(--badge-border, transparent);
		--_hover-bg: var(--badge-hover-bg, color-mix(in oklch, var(--_bg) 80%, transparent));
		--_radius: var(--badge-radius, var(--radius-full));

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
		flex-shrink: 0;
		width: fit-content;
		height: 1.25rem;
		padding: var(--space-0-5) var(--space-2);
		overflow: hidden;
		border: 1px solid var(--_border);
		border-radius: var(--_radius);
		background: var(--_bg);
		color: var(--_fg);
		font-size: var(--text-xs);
		line-height: var(--text-xs-line-height);
		font-weight: var(--font-weight-medium);
		white-space: nowrap;
		text-decoration: none;
		outline: none;
		transition:
			background-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);

		/* Only links react to hover. */
		&[href]:hover {
			background: var(--_hover-bg);
		}

		&:focus-visible {
			border-color: var(--color-ring);
			box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
		}

		& :global(svg) {
			flex-shrink: 0;
			width: 0.75rem;
			height: 0.75rem;
			pointer-events: none;
		}
	}

	.badge[data-variant='secondary'] {
		--_bg: var(--badge-bg, var(--color-secondary));
		--_fg: var(--badge-fg, var(--color-secondary-foreground));
	}

	.badge[data-variant='outline'] {
		--_bg: var(--badge-bg, transparent);
		--_fg: var(--badge-fg, var(--color-foreground));
		--_border: var(--badge-border, var(--color-border));
		--_hover-bg: var(--badge-hover-bg, var(--color-muted));
	}

	.badge[data-variant='ghost'] {
		--_bg: var(--badge-bg, transparent);
		--_fg: var(--badge-fg, var(--color-foreground));
		--_hover-bg: var(--badge-hover-bg, var(--color-muted));
	}

	.badge[data-variant='destructive'] {
		--_bg: var(--badge-bg, color-mix(in oklch, var(--color-destructive) 10%, transparent));
		/* Pulled toward the foreground so the text passes AA contrast, as in Button. */
		--_fg: var(
			--badge-fg,
			color-mix(in oklch, var(--color-destructive) 80%, var(--color-foreground))
		);
		--_hover-bg: var(
			--badge-hover-bg,
			color-mix(in oklch, var(--color-destructive) 20%, transparent)
		);
	}

	.badge[data-variant='link'] {
		--_bg: var(--badge-bg, transparent);
		--_fg: var(--badge-fg, var(--color-primary));
		--_hover-bg: var(--badge-hover-bg, transparent);
		text-underline-offset: 4px;

		&[href]:hover {
			text-decoration: underline;
		}
	}
</style>
