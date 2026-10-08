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
		flex-direction: column-reverse;
		gap: var(--space-2);

		@media (width >= 40rem) {
			flex-direction: row;
			justify-content: flex-end;
		}
	}
</style>
