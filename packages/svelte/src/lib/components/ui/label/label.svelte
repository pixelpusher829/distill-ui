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

<!--
	Options you can set from a parent or on the label itself:
	--dui-label-fg
-->

<style>
	.label {
		display: flex;
		align-items: center;
		gap: var(--dui-space-2);
		color: var(--dui-label-fg, var(--dui-color-foreground));
		font-size: var(--dui-text-sm);
		line-height: 1;
		font-weight: var(--dui-font-weight-medium);
		user-select: none;
	}
</style>
