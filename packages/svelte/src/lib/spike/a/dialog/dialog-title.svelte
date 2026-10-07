<script lang="ts">
	import { Dialog as DialogPrimitive, type WithoutChild } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<DialogPrimitive.TitleProps> = $props();
</script>

<DialogPrimitive.Title bind:ref {...restProps}>
	{#snippet child({ props })}
		<h2 {...props} class={['title', className]}>{@render children?.()}</h2>
	{/snippet}
</DialogPrimitive.Title>

<style>
	.title {
		margin: 0;
		font-size: var(--text-base);
		line-height: 1;
		font-weight: var(--font-weight-medium);
	}
</style>
