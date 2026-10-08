<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} aria-hidden="true" class={['skeleton', className]}></div>

<style>
	.skeleton {
		border-radius: var(--skeleton-radius, var(--radius-md));
		background: var(--skeleton-bg, var(--color-muted));
		animation: distill-pulse var(--duration-pulse) var(--ease-in-out) infinite;
	}
</style>
