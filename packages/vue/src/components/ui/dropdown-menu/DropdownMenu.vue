<script setup lang="ts">
import { DropdownMenuRoot } from 'reka-ui';
import { ref, toRef } from 'vue';
import { provideDropdownMenu } from './context.js';
import type { Placement } from './placement.js';

// Use `v-model:open` to control it from outside.
const { placement = 'bottom-start' } = defineProps<{ placement?: Placement }>();
const open = defineModel<boolean>('open', { default: false });
provideDropdownMenu({ open, placement: toRef(() => placement), focusLast: ref(false) });
</script>

<template>
	<!-- Not modal, like the Svelte version: the page stays usable and readable while it is open. -->
	<DropdownMenuRoot v-model:open="open" :modal="false">
		<slot />
	</DropdownMenuRoot>
</template>
