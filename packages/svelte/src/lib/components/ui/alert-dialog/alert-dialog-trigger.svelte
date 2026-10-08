<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getAlertDialogContext } from './context.js';

	// Renders our Button with Melt's trigger attributes, so it takes the same
	// variant and size props: `<AlertDialog.Trigger variant="outline">Open</AlertDialog.Trigger>`.
	let {
		variant = 'default',
		children,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { dialog } = getAlertDialogContext();
</script>

<Button {...restProps} {...dialog.trigger} aria-haspopup="dialog" {variant}>
	{@render children?.()}
</Button>
