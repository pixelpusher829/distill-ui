<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} class={['label', className]}>
	{@render children?.()}
</div>

<style>
	.label {
		padding: var(--space-1-5) var(--space-2);
		color: var(--color-muted-foreground);
		font-size: var(--text-xs);
		line-height: var(--text-xs-line-height);
		font-weight: var(--font-weight-medium);
	}
</style>
