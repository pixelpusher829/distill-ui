<script setup lang="ts">
import { Label, Switch } from '@distill-ui/vue';
import { ref } from 'vue';

const airplane = ref(false);
</script>

<template>
	<div class="stack">
		<Label><Switch v-model="airplane" /> Airplane mode</Label>
		<Label><Switch size="sm" /> Small</Label>
		<Label><Switch disabled /> Disabled</Label>
	</div>
</template>

<style scoped>
.stack {
	display: grid;
	gap: var(--dui-space-3);
}
</style>
