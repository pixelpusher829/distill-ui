<script lang="ts">
	import { Dialog as Primitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<Primitive.TitleProps> = $props();
</script>

<Primitive.Title bind:ref class={['dui-dialog-title', className]} {...restProps} />

<style>
	:global(.dui-dialog-title) {
		margin: 0;
		font-size: var(--text-base);
		line-height: 1;
		font-weight: var(--font-weight-medium);
	}
</style>
