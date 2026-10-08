<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} class={['label', className]}>
	{@render children?.()}
</div>

<style>
	.label {
		padding: var(--dui-space-1-5) var(--dui-space-2);
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-xs);
		line-height: var(--dui-text-xs-line-height);
		font-weight: var(--dui-font-weight-medium);
	}
</style>
