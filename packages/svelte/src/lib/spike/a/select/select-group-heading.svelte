<script lang="ts">
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<SelectPrimitive.GroupHeadingProps> = $props();
</script>

<SelectPrimitive.GroupHeading bind:ref {...restProps}>
	{#snippet child({ props })}
		<div {...props} class={['heading', className]}>{@render children?.()}</div>
	{/snippet}
</SelectPrimitive.GroupHeading>

<style>
	.heading {
		padding: var(--space-1-5) var(--space-2);
		color: var(--color-muted-foreground);
		font-size: var(--text-xs);
		line-height: var(--text-xs-line-height);
	}
</style>
