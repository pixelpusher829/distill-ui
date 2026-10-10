<script setup lang="ts">
import {
	AlertDialogRoot,
	useForwardPropsEmits,
	type AlertDialogEmits,
	type AlertDialogProps
} from 'reka-ui';

// Use `v-model:open` to control it from outside.
const props = defineProps<AlertDialogProps>();
const emits = defineEmits<AlertDialogEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<AlertDialogRoot v-bind="forwarded">
		<slot />
	</AlertDialogRoot>
</template>
