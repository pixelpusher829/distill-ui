<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} class={['content', className]}>
	{@render children?.()}
</div>

<style>
	.content {
		padding-inline: var(--_card-spacing);
	}
</style>
