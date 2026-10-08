<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';
	import { setDropdownMenuContext } from './context.js';
	import { Menu } from './menu.svelte.js';

	let {
		open = $bindable(false),
		placement = 'bottom-start',
		children
	}: { open?: boolean; placement?: Placement; children?: Snippet } = $props();

	const menu = new Menu({
		open: () => open,
		onOpenChange: (v) => (open = v),
		floatingConfig: () => ({ computePosition: { placement }, offset: { mainAxis: 4 } })
	});
	setDropdownMenuContext({ menu });
</script>

{@render children?.()}
