<script setup lang="ts">
import { DialogTrigger } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// Renders our Button with Reka's trigger attributes, so it takes the same
// variant and size props: `<Dialog.Trigger variant="outline">Open</Dialog.Trigger>`.
const { variant = 'default', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<DialogTrigger as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</DialogTrigger>
</template>
