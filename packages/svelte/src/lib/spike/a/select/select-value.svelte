<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<SelectPrimitive.ValueProps> = $props();
</script>

<SelectPrimitive.Value bind:ref {...restProps}>
	{#snippet child({ props, selection, placeholder })}
		<span {...props} class={['value', className]}>
			{#if selection.type === 'single'}
				{selection.selected?.label ?? placeholder}
			{:else}
				{selection.selected.map((s) => s.label).join(', ') || placeholder}
			{/if}
		</span>
	{/snippet}
</SelectPrimitive.Value>

<style>
	.value {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--space-1-5);
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
