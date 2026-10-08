<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getSheetContext } from './context.js';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();
	const { descriptionId } = getSheetContext();
</script>

<p id={descriptionId} class={['description', className]} {...restProps}>{@render children?.()}</p>

<style>
	.description {
		margin: 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
		line-height: var(--dui-text-sm-line-height);
	}
</style>
