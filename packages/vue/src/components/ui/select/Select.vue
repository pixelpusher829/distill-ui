<script setup lang="ts">
import {
	SelectRoot,
	useForwardPropsEmits,
	type SelectRootEmits,
	type SelectRootProps
} from 'reka-ui';
import { ref, useId } from 'vue';
import { provideSelect } from './context.js';

// Use `v-model` for the value and `v-model:open` for the open state.
const props = defineProps<SelectRootProps<string>>();
const emits = defineEmits<SelectRootEmits<string>>();
const forwarded = useForwardPropsEmits(props, emits);

const uid = useId();
provideSelect({ labelId: `${uid}-label`, triggerId: `${uid}-trigger`, hasLabel: ref(false) });
</script>

<template>
	<SelectRoot v-bind="forwarded">
		<slot />
	</SelectRoot>
</template>
