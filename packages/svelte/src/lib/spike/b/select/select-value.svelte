<script lang="ts">
	import { Select as Primitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<Primitive.ValueProps> = $props();
</script>

<Primitive.Value bind:ref class={['dui-select-value', className]} {...restProps} />

<style>
	:global(.dui-select-value) {
		display: flex;
		flex: 1;
		align-items: center;
		gap: var(--space-1-5);
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
