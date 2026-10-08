<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: HTMLLabelAttributes & { ref?: HTMLLabelElement | null } = $props();
</script>

<label {...restProps} bind:this={ref} class={['label', className]}>
	{@render children?.()}
</label>

<style>
	.label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--label-fg, var(--color-foreground));
		font-size: var(--text-sm);
		line-height: 1;
		font-weight: var(--font-weight-medium);
		user-select: none;
	}
</style>
