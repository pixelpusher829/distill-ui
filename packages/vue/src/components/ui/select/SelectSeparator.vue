<script setup lang="ts">
import { SelectSeparator } from 'reka-ui';
</script>

<template>
	<SelectSeparator as-child>
		<div class="separator"></div>
	</SelectSeparator>
</template>

<style scoped>
.separator {
	height: 1px;
	margin: var(--dui-space-1) calc(var(--dui-space-1) * -1);
	background: var(--dui-color-border);
}
</style>
