<script setup lang="ts">
import { DropdownMenuSeparator } from 'reka-ui';
</script>

<template>
	<DropdownMenuSeparator as-child>
		<div class="separator"></div>
	</DropdownMenuSeparator>
</template>

<style scoped>
.separator {
	height: 1px;
	margin: var(--dui-space-1) calc(var(--dui-space-1) * -1);
	background: var(--dui-color-border);
}
</style>
