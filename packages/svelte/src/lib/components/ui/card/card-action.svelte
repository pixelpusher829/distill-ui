<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} class={['action', className]}>
	{@render children?.()}
</div>

<style>
	.action {
		grid-column: 2;
		grid-row: 1 / span 2;
		align-self: start;
		justify-self: end;
		margin-inline-start: var(--dui-space-4);
	}
</style>
