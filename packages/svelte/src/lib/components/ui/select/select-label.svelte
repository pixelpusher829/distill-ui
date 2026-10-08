<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';
	import { getSelectContext } from './context.js';

	let { class: className, children, ...restProps }: HTMLLabelAttributes = $props();

	const ctx = getSelectContext();
	ctx.hasLabel = true;
</script>

<label {...restProps} {...ctx.select.label} id={ctx.labelId} class={['label', className]}>
	{@render children?.()}
</label>

<style>
	.label {
		display: block;
		margin-bottom: var(--space-2);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
		font-weight: var(--font-weight-medium);
	}
</style>
