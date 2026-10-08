<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getDialogContext } from './context.js';

	// A Button that closes the dialog: `<Dialog.Close>Cancel</Dialog.Close>`.
	let {
		variant = 'outline',
		children,
		onclick,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { dialog } = getDialogContext();
</script>

<Button
	{...restProps}
	{variant}
	onclick={(e: MouseEvent & { currentTarget: HTMLButtonElement }) => {
		onclick?.(e);
		dialog.open = false;
	}}
>
	{@render children?.()}
</Button>
