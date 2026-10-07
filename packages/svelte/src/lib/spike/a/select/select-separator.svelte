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
		margin: var(--space-1) calc(var(--space-1) * -1);
		background: var(--color-border);
	}
</style>
