<script setup lang="ts">
import {
	DialogRoot,
	useForwardPropsEmits,
	type DialogRootEmits,
	type DialogRootProps
} from 'reka-ui';

// Use `v-model:open` to control it from outside.
const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DialogRoot v-bind="forwarded">
		<slot />
	</DialogRoot>
</template>
