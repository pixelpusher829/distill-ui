<script lang="ts">
	import { Dialog as DialogPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<DialogPrimitive.DescriptionProps> = $props();
</script>

<DialogPrimitive.Description bind:ref {...restProps}>
	{#snippet child({ props })}
		<p {...props} class={['description', className]}>{@render children?.()}</p>
	{/snippet}
</DialogPrimitive.Description>

<style>
	.description {
		margin: 0;
		color: var(--color-muted-foreground);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
	}
</style>
