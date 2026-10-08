<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> = $props();
</script>

<div {...restProps} role="separator" class={['separator', className]}></div>

<style>
	.separator {
		height: 1px;
		margin: var(--dui-space-1) calc(var(--dui-space-1) * -1);
		background: var(--dui-color-border);
	}
</style>
