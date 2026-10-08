<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		orientation = 'horizontal',
		decorative = true,
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		ref?: HTMLDivElement | null;
		orientation?: 'horizontal' | 'vertical';
		/** Purely visual by default. Set to false when the line separates meaningful sections. */
		decorative?: boolean;
	} = $props();
</script>

<div
	{...restProps}
	bind:this={ref}
	role={decorative ? 'none' : 'separator'}
	aria-orientation={decorative ? undefined : orientation}
	class={['separator', className]}
	data-orientation={orientation}
></div>

<!--
	Options you can set from a parent or on the separator itself:
	--dui-separator-color
-->

<style>
	.separator {
		flex-shrink: 0;
		background: var(--dui-separator-color, var(--dui-color-border));

		&[data-orientation='horizontal'] {
			width: 100%;
			height: 1px;
		}

		&[data-orientation='vertical'] {
			width: 1px;
			align-self: stretch;
		}
	}
</style>
