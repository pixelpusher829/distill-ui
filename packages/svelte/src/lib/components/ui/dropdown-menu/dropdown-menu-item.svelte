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
		gap: var(--dui-space-2);
		padding: var(--dui-space-1-5) var(--dui-space-2);
		border-radius: var(--dui-radius-sm);
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		cursor: default;
		outline: none;
		user-select: none;

		&:focus {
			background: var(--dui-color-accent);
			color: var(--dui-color-accent-foreground);
		}

		&[data-disabled] {
			pointer-events: none;
			opacity: 0.5;
		}

		&[data-inset] {
			padding-inline-start: var(--dui-space-8);
		}

		& :global(svg) {
			flex-shrink: 0;
			width: 1rem;
			height: 1rem;
			pointer-events: none;
		}
	}

	.item[data-variant='destructive'] {
		color: color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground));

		&:focus {
			background: color-mix(in oklch, var(--dui-color-destructive) 10%, transparent);
			color: color-mix(in oklch, var(--dui-color-destructive) 80%, var(--dui-color-foreground));
		}
	}
</style>
