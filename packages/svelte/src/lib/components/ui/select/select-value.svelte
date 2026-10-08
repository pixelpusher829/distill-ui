<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getSelectContext } from './context.js';

	let {
		class: className,
		placeholder = '',
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { placeholder?: string } = $props();

	const { select } = getSelectContext();
	const label = $derived(select.value ? select.getOptionLabel(select.value) : placeholder);
</script>

<span class={['value', className]} {...restProps}>{label}</span>

<style>
	.value {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--dui-space-1-5);
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
