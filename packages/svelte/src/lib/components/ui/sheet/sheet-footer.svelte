<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div bind:this={ref} class={['footer', className]} {...restProps}>
	{@render children?.()}
</div>

<style>
	.footer {
		display: flex;
		flex-direction: column;
		gap: var(--dui-space-2);
		/* Sits at the bottom of the sheet. */
		margin-top: auto;
	}
</style>
