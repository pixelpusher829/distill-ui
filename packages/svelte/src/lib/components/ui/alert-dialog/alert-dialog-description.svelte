<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getAlertDialogContext } from './context.js';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();
	const { descriptionId } = getAlertDialogContext();
</script>

<p id={descriptionId} class={['description', className]} {...restProps}>{@render children?.()}</p>

<style>
	.description {
		margin: 0;
		color: var(--color-muted-foreground);
		font-size: var(--text-sm);
		line-height: var(--text-sm-line-height);
	}
</style>
