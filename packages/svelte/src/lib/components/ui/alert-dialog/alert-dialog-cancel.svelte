<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getAlertDialogContext } from './context.js';

	// Closes without doing anything: `<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>`.
	let {
		variant = 'outline',
		children,
		onclick,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { dialog } = getAlertDialogContext();
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
