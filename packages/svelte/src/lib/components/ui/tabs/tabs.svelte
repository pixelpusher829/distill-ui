<script lang="ts">
	import { Tabs } from 'melt/builders';
	import type { HTMLAttributes } from 'svelte/elements';
	import { setTabsContext } from './context.js';

	let {
		value = $bindable(''),
		orientation = 'horizontal',
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		value?: string;
		orientation?: 'horizontal' | 'vertical';
	} = $props();

	const tabs = new Tabs<string>({
		value: () => value,
		onValueChange: (v) => (value = v),
		orientation: () => orientation,
		loop: true
	});
	const ctx = $state({ tabs, listVariant: 'default' as const });
	setTabsContext(ctx);
</script>

<div {...restProps} class={['tabs', className]} data-orientation={orientation}>
	{@render children?.()}
</div>

<style>
	.tabs {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);

		&[data-orientation='vertical'] {
			flex-direction: row;
		}
	}
</style>
