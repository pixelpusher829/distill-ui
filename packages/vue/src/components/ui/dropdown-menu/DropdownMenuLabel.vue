<script setup lang="ts">
import { DropdownMenuLabel } from 'reka-ui';
</script>

<template>
	<DropdownMenuLabel as-child>
		<div class="label"><slot /></div>
	</DropdownMenuLabel>
</template>

<style scoped>
.label {
	padding: var(--dui-space-1-5) var(--dui-space-2);
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-xs);
	line-height: var(--dui-text-xs-line-height);
	font-weight: var(--dui-font-weight-medium);
}
</style>
