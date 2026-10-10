<script setup lang="ts">
import { DialogClose } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// A Button that closes the sheet: `<Sheet.Close>Cancel</Sheet.Close>`.
const { variant = 'outline', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<DialogClose as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</DialogClose>
</template>
