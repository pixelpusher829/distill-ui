<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} class={['title', className]}>
	{@render children?.()}
</div>

<style>
	.title {
		grid-column: 1;
		font-size: var(--card-title-size);
		line-height: 1.5;
		font-weight: var(--dui-font-weight-medium);
	}
</style>
