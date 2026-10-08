<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getTabsContext } from './context.js';

	let {
		class: className,
		value,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { value: string } = $props();

	const ctx = getTabsContext();
</script>

<div
	{...restProps}
	{...ctx.tabs.getContent(value)}
	role="tabpanel"
	tabindex="0"
	class={['content', className]}
>
	{@render children?.()}
</div>

<style>
	.content {
		flex: 1;
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
		outline: none;

		&:focus-visible {
			border-radius: var(--dui-radius-md);
			box-shadow: 0 0 0 var(--dui-ring-width)
				color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		}
	}
</style>
