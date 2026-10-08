<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} class={['title', className]}>
	{@render children?.()}
</div>

<style>
	.title {
		/* The last column, whether or not the alert has an icon. */
		grid-column: -2;
		font-weight: var(--dui-font-weight-medium);
	}
</style>
