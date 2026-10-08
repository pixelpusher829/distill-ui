<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { ref?: HTMLDivElement | null } = $props();
</script>

<div {...restProps} bind:this={ref} class={['group', className]}>
	{@render children?.()}
</div>

<style>
	.group {
		/* Read by each Avatar inside: overlap them and ring each one in the page color. */
		--_avatar-overlap: calc(var(--space-2) * -1);
		--_avatar-ring-width: 2px;

		display: flex;
	}
</style>
