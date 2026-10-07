<script lang="ts">
	import { Select } from 'melt/builders';
	import type { Snippet } from 'svelte';
	import { setSelectContext } from './context.js';

	// Melt's Select takes no `type` or `items`; they're accepted (and ignored) so the demo API matches the Bits options.
	// eslint-disable-next-line svelte/no-unused-props
	let {
		value = $bindable(),
		children
	}: { value?: string; type?: 'single'; items?: unknown[]; children?: Snippet } = $props();

	const select = new Select<string>({
		value: () => value || undefined,
		onValueChange: (v) => (value = v ?? ''),
		sameWidth: false
	});
	setSelectContext({ select, placeholder: { current: '' } });
</script>

{@render children?.()}
