<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
	import { getTooltipContext } from './context.js';

	let {
		variant = 'outline',
		children,
		...restProps
	}: HTMLButtonAttributes & { variant?: ButtonVariant; size?: ButtonSize } = $props();

	const { tooltip } = getTooltipContext();
</script>

<Button {...restProps} {...tooltip.trigger} {variant}>
	{@render children?.()}
</Button>
