<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLParagraphElement> & { ref?: HTMLParagraphElement | null } = $props();
</script>

<p {...restProps} bind:this={ref} class={['description', className]}>
	{@render children?.()}
</p>

<style>
	.description {
		grid-column: 1;
		margin: 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
	}
</style>
