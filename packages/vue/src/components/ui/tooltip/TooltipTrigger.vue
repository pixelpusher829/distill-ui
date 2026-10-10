<script setup lang="ts">
import { TooltipTrigger } from 'reka-ui';
import { Button, type ButtonSize, type ButtonVariant } from '../button/index.js';

// Renders our Button, so it takes the same variant and size props.
const { variant = 'outline', size } = defineProps<{ variant?: ButtonVariant; size?: ButtonSize }>();
</script>

<template>
	<TooltipTrigger as-child>
		<Button :variant="variant" :size="size"><slot /></Button>
	</TooltipTrigger>
</template>
