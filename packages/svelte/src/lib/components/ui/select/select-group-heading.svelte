<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={['heading', className]} {...restProps}>{@render children?.()}</div>

<style>
	.heading {
		padding: var(--dui-space-1-5) var(--dui-space-2);
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-xs);
		line-height: var(--dui-text-xs-line-height);
	}
</style>
