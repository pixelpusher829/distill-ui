<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getDialogContext } from './context.js';

	let {
		child,
		children,
		...restProps
	}: HTMLButtonAttributes & { child?: Snippet<[{ props: Record<string, unknown> }]> } = $props();

	const { dialog } = getDialogContext();
	const mergedProps = $derived({
		...restProps,
		...dialog.trigger,
		'aria-haspopup': 'dialog' as const
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<button {...mergedProps}>{@render children?.()}</button>
{/if}
