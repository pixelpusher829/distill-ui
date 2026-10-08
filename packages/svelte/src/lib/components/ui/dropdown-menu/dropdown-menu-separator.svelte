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
		margin: var(--space-1) calc(var(--space-1) * -1);
		background: var(--color-border);
	}
</style>
