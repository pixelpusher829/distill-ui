<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} class={['description', className]}>
	{@render children?.()}
</div>

<style>
	.description {
		grid-column: -2;
		/* Slightly softer than the title; inherits the destructive color in that variant. */
		color: color-mix(in oklch, currentColor 85%, transparent);
		text-wrap: pretty;
	}
</style>
