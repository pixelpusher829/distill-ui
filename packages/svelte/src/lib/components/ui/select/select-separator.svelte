<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div bind:this={ref} role="separator" class={['separator', className]} {...restProps}></div>

<style>
	.separator {
		height: 1px;
		margin: var(--dui-space-1) calc(var(--dui-space-1) * -1);
		background: var(--dui-color-border);
	}
</style>
