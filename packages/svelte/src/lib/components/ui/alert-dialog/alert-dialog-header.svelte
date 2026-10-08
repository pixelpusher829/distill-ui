<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div bind:this={ref} class={['header', className]} {...restProps}>
	{@render children?.()}
</div>

<style>
	.header {
		display: flex;
		flex-direction: column;
		gap: var(--dui-space-2);
	}
</style>
