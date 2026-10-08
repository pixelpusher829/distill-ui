<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} class={['header', className]}>
	{@render children?.()}
</div>

<style>
	.header {
		/* Two columns so Card.Action can sit top-right beside the title and description. */
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: start;
		row-gap: var(--space-1);
		padding-inline: var(--_card-spacing);
	}
</style>
