<script setup lang="ts">
import { TooltipProvider, TooltipRoot } from 'reka-ui';
import { toRef } from 'vue';
import { provideTooltipPlacement } from './context.js';
import type { Placement } from './placement.js';

// Use `v-model:open` to control it from outside.
const { placement = 'top', openDelay = 300 } = defineProps<{
	placement?: Placement;
	openDelay?: number;
}>();
const open = defineModel<boolean>('open', { default: false });
provideTooltipPlacement(toRef(() => placement));
</script>

<template>
	<TooltipProvider :delay-duration="openDelay">
		<TooltipRoot v-model:open="open">
			<slot />
		</TooltipRoot>
	</TooltipProvider>
</template>
