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
		--bg: var(--dui-badge-bg, var(--dui-color-primary));
		--fg: var(--dui-badge-fg, var(--dui-color-primary-foreground));
		--border: var(--dui-badge-border, transparent);
		--hover-bg: var(--dui-badge-hover-bg, color-mix(in oklch, var(--bg) 80%, transparent));
		--radius: var(--dui-badge-radius, var(--dui-radius-full));

		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--dui-space-1);
		flex-shrink: 0;
		width: fit-content;
		height: 1.25rem;
		padding: var(--dui-space-0-5) var(--dui-space-2);
		overflow: hidden;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg);
		color: var(--fg);
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
			background: var(--hover-bg);
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
		--bg: var(--dui-badge-bg, var(--dui-color-secondary));
		--fg: var(--dui-badge-fg, var(--dui-color-secondary-foreground));
	}

	.badge[data-variant='outline'] {
		--bg: var(--dui-badge-bg, transparent);
		--fg: var(--dui-badge-fg, var(--dui-color-foreground));
		--border: var(--dui-badge-border, var(--dui-color-border));
		--hover-bg: var(--dui-badge-hover-bg, var(--dui-color-muted));
	}

	.badge[data-variant='ghost'] {
		--bg: var(--dui-badge-bg, transparent);
		--fg: var(--dui-badge-fg, var(--dui-color-foreground));
		--hover-bg: var(--dui-badge-hover-bg, var(--dui-color-muted));
	}

	.badge[data-variant='destructive'] {
		--bg: var(--dui-badge-bg, color-mix(in oklch, var(--dui-color-destructive) 10%, transparent));
		/* Pulled toward the foreground so the text passes AA contrast, as in Button. */
		--fg: var(
			--dui-badge-fg,
			color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground))
		);
		--hover-bg: var(
			--dui-badge-hover-bg,
			color-mix(in oklch, var(--dui-color-destructive) 20%, transparent)
		);
	}

	.badge[data-variant='link'] {
		--bg: var(--dui-badge-bg, transparent);
		--fg: var(--dui-badge-fg, var(--dui-color-primary));
		--hover-bg: var(--dui-badge-hover-bg, transparent);
		text-underline-offset: 4px;

		&[href]:hover {
			text-decoration: underline;
		}
	}
</style>
