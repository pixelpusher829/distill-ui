<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getDropdownMenuContext } from './context.js';

	let {
		disabled = false,
		variant = 'default',
		inset = false,
		onSelect,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		disabled?: boolean;
		variant?: 'default' | 'destructive';
		/** Indent to line up with items that have a check mark or icon. */
		inset?: boolean;
		onSelect?: () => void;
	} = $props();

	const { menu } = getDropdownMenuContext();
</script>

<div
	{...restProps}
	{...menu.getItem({ disabled, onSelect })}
	role="menuitem"
	class={['item', className]}
	data-variant={variant}
	data-inset={inset || undefined}
>
	{@render children?.()}
</div>

<style>
	.item {
		position: relative;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-1-5) var(--space-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		cursor: default;
		outline: none;
		user-select: none;

		&:focus {
			background: var(--color-accent);
			color: var(--color-accent-foreground);
		}

		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
		}

		&[data-inset] {
			padding-inline-start: var(--space-8);
		}

		& :global(svg) {
			flex-shrink: 0;
			width: 1rem;
			height: 1rem;
			pointer-events: none;
		}
	}

	.item[data-variant='destructive'] {
		color: color-mix(in oklch, var(--color-destructive) 80%, var(--color-foreground));

		&:focus {
			background: color-mix(in oklch, var(--color-destructive) 10%, transparent);
			color: color-mix(in oklch, var(--color-destructive) 80%, var(--color-foreground));
		}
	}
</style>
