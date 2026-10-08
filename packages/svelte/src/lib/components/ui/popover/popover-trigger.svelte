<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getPopoverContext } from './context.js';

	let {
		variant = 'outline',
		children,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { popover } = getPopoverContext();
</script>

<Button
	{...restProps}
	{...popover.trigger}
	aria-haspopup="dialog"
	aria-expanded={popover.open}
	aria-controls={popover.ids.content}
	{variant}
>
	{@render children?.()}
</Button>
