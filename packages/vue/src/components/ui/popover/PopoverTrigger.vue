<script setup lang="ts">
import { PopoverTrigger } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// Renders our Button, so it takes the same variant and size props.
const { variant = 'outline', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<PopoverTrigger as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</PopoverTrigger>
</template>
