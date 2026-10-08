<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { setRadioGroupContext } from './context.js';

	let {
		value = $bindable(''),
		name,
		disabled = false,
		orientation = 'vertical',
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		value?: string;
		name?: string;
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
	} = $props();

	const id = $props.id();
	setRadioGroupContext({
		get name() {
			return name ?? `radio-group-${id}`;
		},
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		get disabled() {
			return disabled;
		}
	});
</script>

<div
	{...restProps}
	role="radiogroup"
	aria-disabled={disabled || undefined}
	aria-orientation={orientation}
	class={['radio-group', className]}
	data-orientation={orientation}
>
	{@render children?.()}
</div>

<style>
	.radio-group {
		display: grid;
		gap: var(--radio-group-gap, var(--space-3));

		&[data-orientation='horizontal'] {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
