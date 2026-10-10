<script setup lang="ts">
import { SelectValue } from 'reka-ui';

const { placeholder = '' } = defineProps<{ placeholder?: string }>();
</script>

<template>
	<SelectValue v-slot="{ selectedLabel }" as-child>
		<span class="value">{{ selectedLabel.length ? selectedLabel.join(', ') : placeholder }}</span>
	</SelectValue>
</template>

<style scoped>
.value {
	display: flex;
	flex: 1;
	align-items: center;
	gap: var(--dui-space-1-5);
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
