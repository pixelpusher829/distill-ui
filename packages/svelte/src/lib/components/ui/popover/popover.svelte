<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { Popover } from 'melt/builders';
	import type { Snippet } from 'svelte';
	import { setPopoverContext } from './context.js';

	let {
		open = $bindable(false),
		placement = 'bottom',
		children
	}: { open?: boolean; placement?: Placement; children?: Snippet } = $props();

	const popover = new Popover({
		open: () => open,
		onOpenChange: (v) => (open = v),
		floatingConfig: () => ({ computePosition: { placement }, offset: { mainAxis: 4 } })
	});
	setPopoverContext({ popover });
</script>

{@render children?.()}
