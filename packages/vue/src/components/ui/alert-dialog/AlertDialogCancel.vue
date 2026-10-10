<script setup lang="ts">
import { AlertDialogCancel } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// Closes without doing anything. Reka focuses it when the dialog opens.
const { variant = 'outline', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<AlertDialogCancel as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</AlertDialogCancel>
</template>
