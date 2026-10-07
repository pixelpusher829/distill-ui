<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	// Melt has no group part; a plain role="group" div stands in.
	let { children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div role="group" {...restProps}>{@render children?.()}</div>
