<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} aria-hidden="true" class={['skeleton', className]}></div>

<!--
	Options you can set from a parent or on the skeleton itself:
	--dui-skeleton-radius, --dui-skeleton-bg
-->

<style>
	.skeleton {
		border-radius: var(--dui-skeleton-radius, var(--dui-radius-md));
		background: var(--dui-skeleton-bg, var(--dui-color-muted));
		animation: distill-pulse var(--dui-duration-pulse) var(--dui-ease-in-out) infinite;
	}
</style>
