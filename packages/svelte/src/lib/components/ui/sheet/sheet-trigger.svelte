<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getSheetContext } from './context.js';

	// Renders our Button with Melt's trigger attributes, so it takes the same
	// variant and size props: `<Sheet.Trigger variant="outline">Open</Sheet.Trigger>`.
	let {
		variant = 'default',
		children,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { dialog } = getSheetContext();
</script>

<Button {...restProps} {...dialog.trigger} aria-haspopup="dialog" {variant}>
	{@render children?.()}
</Button>
