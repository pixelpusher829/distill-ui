<script setup lang="ts">
import { Checkbox, Label } from '@distill-ui/vue';
import { ref } from 'vue';

const terms = ref(false);
</script>

<template>
	<div class="stack">
		<Label><Checkbox v-model="terms" /> Accept terms and conditions</Label>
		<Label><Checkbox indeterminate /> Some items selected</Label>
		<Label><Checkbox disabled /> Disabled</Label>
	</div>
</template>

<style scoped>
.stack {
	display: grid;
	gap: var(--dui-space-3);
}
</style>
