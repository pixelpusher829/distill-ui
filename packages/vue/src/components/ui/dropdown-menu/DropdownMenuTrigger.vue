<script setup lang="ts">
import { DropdownMenuTrigger } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';
import { injectDropdownMenu } from './context.js';

// Renders our Button, so it takes the same variant and size props.
const { variant = 'outline', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
const menu = injectDropdownMenu();

// The menu button pattern also opens on ArrowUp, landing on the last item.
function onKeydown(event: KeyboardEvent) {
	if (event.key !== 'ArrowUp' || menu.open.value) return;
	event.preventDefault();
	menu.focusLast.value = true;
	menu.open.value = true;
}
</script>

<template>
	<DropdownMenuTrigger as-child>
		<Button :variant="variant" :size="size" @keydown="onKeydown"><slot /></Button>
	</DropdownMenuTrigger>
</template>
