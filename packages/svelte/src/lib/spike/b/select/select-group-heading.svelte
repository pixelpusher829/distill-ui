<script lang="ts">
	import { Select as Primitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<Primitive.GroupHeadingProps> = $props();
</script>

<Primitive.GroupHeading bind:ref class={['dui-select-group-heading', className]} {...restProps} />

<style>
	:global(.dui-select-group-heading) {
		padding: var(--space-1-5) var(--space-2);
		color: var(--color-muted-foreground);
		font-size: var(--text-xs);
		line-height: var(--text-xs-line-height);
	}
</style>
