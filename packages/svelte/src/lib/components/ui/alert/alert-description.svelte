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
		text-wrap: pretty;
	}
</style>
