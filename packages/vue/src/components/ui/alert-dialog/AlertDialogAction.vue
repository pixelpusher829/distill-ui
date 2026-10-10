<script setup lang="ts">
import { AlertDialogAction } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// Confirms: runs its @click, then closes. `<AlertDialog.Action @click="remove">`.
const { variant = 'default', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<AlertDialogAction as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</AlertDialogAction>
</template>
