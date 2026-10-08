<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} class={['footer', className]}>
	{@render children?.()}
</div>

<style>
	.footer {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding-inline: var(--_card-spacing);
	}
</style>
