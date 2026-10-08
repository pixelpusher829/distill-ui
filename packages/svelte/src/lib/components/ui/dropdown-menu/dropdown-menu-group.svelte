<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} role="group" class={['group', className]}>
	{@render children?.()}
</div>

<style>
	.group {
		display: block;
	}
</style>
