<script setup lang="ts">
import { DropdownMenuGroup } from 'reka-ui';
</script>

<template>
	<DropdownMenuGroup as-child>
		<div class="group"><slot /></div>
	</DropdownMenuGroup>
</template>

<style scoped>
.group {
	display: block;
}
</style>
