<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getSheetContext } from './context.js';

	// A Button that closes the dialog: `<Sheet.Close>Cancel</Sheet.Close>`.
	let {
		variant = 'outline',
		children,
		onclick,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { dialog } = getSheetContext();
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
