<script lang="ts">
	import { Dialog } from 'melt/builders';
	import type { Snippet } from 'svelte';
	import { setSheetContext } from './context.js';

	let { open = $bindable(false), children }: { open?: boolean; children?: Snippet } = $props();

	const uid = $props.id();
	const dialog = new Dialog({
		open: () => open,
		onOpenChange: (v) => (open = v)
	});
	setSheetContext({ dialog, titleId: `${uid}-title`, descriptionId: `${uid}-description` });
</script>

{@render children?.()}
