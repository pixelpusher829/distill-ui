<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getDropdownMenuContext } from './context.js';

	let {
		variant = 'outline',
		children,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { menu } = getDropdownMenuContext();
</script>

<Button {...restProps} {...menu.trigger} {variant}>
	{@render children?.()}
</Button>
