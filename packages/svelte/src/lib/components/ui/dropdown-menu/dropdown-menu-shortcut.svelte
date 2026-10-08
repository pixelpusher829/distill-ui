<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span {...restProps} class={['shortcut', className]}>
	{@render children?.()}
</span>

<style>
	.shortcut {
		margin-inline-start: auto;
		/* Pulled toward the foreground so it passes AA contrast on the highlighted item. */
		color: color-mix(in oklch, var(--color-muted-foreground) 70%, var(--color-foreground));
		font-size: var(--text-xs);
		letter-spacing: 0.1em;
	}
</style>
