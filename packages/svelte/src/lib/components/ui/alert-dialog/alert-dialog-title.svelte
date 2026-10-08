<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { getAlertDialogContext } from './context.js';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
	const { titleId } = getAlertDialogContext();
</script>

<h2 id={titleId} class={['title', className]} {...restProps}>{@render children?.()}</h2>

<style>
	.title {
		margin: 0;
		font-size: var(--dui-text-base);
		line-height: 1;
		font-weight: var(--dui-font-weight-medium);
	}
</style>
