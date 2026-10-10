<script setup lang="ts">
import { computed, useId } from 'vue';
import { provideRadioGroup } from './context.js';

const {
	name,
	disabled = false,
	orientation = 'vertical'
} = defineProps<{ name?: string; disabled?: boolean; orientation?: 'horizontal' | 'vertical' }>();
const value = defineModel<string>({ default: '' });

const id = useId();
provideRadioGroup({
	name: computed(() => name ?? `radio-group-${id}`),
	value,
	disabled: computed(() => disabled)
});
</script>

<template>
	<div
		role="radiogroup"
		class="radio-group"
		:aria-disabled="disabled || undefined"
		:aria-orientation="orientation"
		:data-orientation="orientation"
	>
		<slot />
	</div>
</template>

<!--
	Options you can set from a parent or on the radio group itself:
	--dui-radio-group-gap
-->

<style scoped>
.radio-group {
	display: grid;
	gap: var(--dui-radio-group-gap, var(--dui-space-3));

	&[data-orientation='horizontal'] {
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
