<script lang="ts">
	import { Select } from 'melt/builders';
	import type { Snippet } from 'svelte';
	import { setSelectContext } from './context.js';

	let {
		value = $bindable(''),
		open = $bindable(false),
		children
	}: { value?: string; open?: boolean; children?: Snippet } = $props();

	const select = new Select<string>({
		value: () => value || undefined,
		onValueChange: (v) => (value = v ?? ''),
		open: () => open,
		onOpenChange: (v) => (open = v),
		sameWidth: false
	});

	const uid = $props.id();
	const ctx = $state({ select, labelId: `${uid}-label`, hasLabel: false });
	setSelectContext(ctx);
</script>

{@render children?.()}
