<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getTabsContext, type TabsListVariant } from './context.js';

	let {
		class: className,
		variant = 'default',
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { variant?: TabsListVariant } = $props();

	const ctx = getTabsContext();
	$effect.pre(() => {
		ctx.listVariant = variant;
	});
</script>

<div {...restProps} {...ctx.tabs.triggerList} class={['list', className]} data-variant={variant}>
	{@render children?.()}
</div>

<style>
	.list {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		height: var(--dui-tabs-list-height, 2.25rem);
		padding: 3px;
		border-radius: var(--dui-tabs-list-radius, var(--dui-radius-lg));
		background: var(--dui-tabs-list-bg, var(--dui-color-muted));
		color: var(--dui-color-muted-foreground);

		&[data-variant='line'] {
			gap: var(--dui-space-1);
			border-radius: 0;
			background: var(--dui-tabs-list-bg, transparent);
		}

		&[data-orientation='vertical'] {
			flex-direction: column;
			height: fit-content;
		}
	}
</style>
