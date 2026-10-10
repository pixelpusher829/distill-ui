<script setup lang="ts">
import { PopoverRoot } from 'reka-ui';
import { toRef } from 'vue';
import { providePopoverPlacement } from './context.js';
import type { Placement } from './placement.js';

// Use `v-model:open` to control it from outside.
const { placement = 'bottom' } = defineProps<{ placement?: Placement }>();
const open = defineModel<boolean>('open', { default: false });
providePopoverPlacement(toRef(() => placement));
</script>

<template>
	<PopoverRoot v-model:open="open">
		<slot />
	</PopoverRoot>
</template>
