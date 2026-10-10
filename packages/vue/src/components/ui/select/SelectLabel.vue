<script setup lang="ts">
import { injectSelect } from './context.js';

const ctx = injectSelect();
ctx.hasLabel.value = true;
</script>

<template>
	<label :id="ctx.labelId" :for="ctx.triggerId" class="label"><slot /></label>
</template>

<style scoped>
.label {
	display: block;
	margin-bottom: var(--dui-space-2);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	font-weight: var(--dui-font-weight-medium);
}
</style>
