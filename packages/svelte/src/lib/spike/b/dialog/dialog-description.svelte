<script lang="ts">
	import { Dialog as Primitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<Primitive.DescriptionProps> = $props();
</script>

<Primitive.Description bind:ref class={['dui-dialog-description', className]} {...restProps} />

<style>
	:global(.dui-dialog-description) {
		margin: 0;
		color: var(--color-muted-foreground);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
	}
</style>
