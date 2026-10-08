<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={['heading', className]} {...restProps}>{@render children?.()}</div>

<style>
	.heading {
		padding: var(--space-1-5) var(--space-2);
		color: var(--color-muted-foreground);
		font-size: var(--text-xs);
		line-height: var(--text-xs-line-height);
	}
</style>
