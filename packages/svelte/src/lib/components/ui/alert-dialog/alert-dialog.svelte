<script lang="ts">
	import { Dialog } from 'melt/builders';
	import type { Snippet } from 'svelte';
	import { setAlertDialogContext } from './context.js';

	let { open = $bindable(false), children }: { open?: boolean; children?: Snippet } = $props();

	const uid = $props.id();
	const dialog = new Dialog({
		open: () => open,
		onOpenChange: (v) => (open = v),
		// An alert dialog needs an answer, so clicking outside doesn't dismiss it.
		closeOnOutsideClick: false
	});
	setAlertDialogContext({ dialog, titleId: `${uid}-title`, descriptionId: `${uid}-description` });
</script>

{@render children?.()}
