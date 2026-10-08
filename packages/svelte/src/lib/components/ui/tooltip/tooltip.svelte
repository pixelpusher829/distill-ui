<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { Tooltip } from 'melt/builders';
	import type { Snippet } from 'svelte';
	import { setTooltipContext } from './context.js';

	let {
		open = $bindable(false),
		placement = 'top',
		openDelay = 300,
		children
	}: { open?: boolean; placement?: Placement; openDelay?: number; children?: Snippet } = $props();

	const tooltip = new Tooltip({
		open: () => open,
		onOpenChange: (v) => (open = v),
		openDelay: () => openDelay,
		floatingConfig: () => ({ computePosition: { placement }, offset: { mainAxis: 4 } })
	});
	setTooltipContext({ tooltip });
</script>

{@render children?.()}
