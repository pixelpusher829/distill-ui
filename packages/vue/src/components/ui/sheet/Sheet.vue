<script setup lang="ts">
import {
	DialogRoot,
	useForwardPropsEmits,
	type DialogRootEmits,
	type DialogRootProps
} from 'reka-ui';

// A Dialog that slides in from an edge. Use `v-model:open` to control it.
const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DialogRoot v-bind="forwarded">
		<slot />
	</DialogRoot>
</template>
