<script setup lang="ts">
import { AlertDialogTrigger } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// Renders our Button, so it takes the same variant and size props.
const { variant = 'default', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<AlertDialogTrigger as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</AlertDialogTrigger>
</template>
