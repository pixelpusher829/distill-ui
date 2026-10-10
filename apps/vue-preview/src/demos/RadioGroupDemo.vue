<script setup lang="ts">
import { Label, RadioGroup } from '@distill-ui/vue';
import { ref } from 'vue';

const plan = ref('comfortable');
</script>

<template>
	<RadioGroup.Root v-model="plan" aria-label="Spacing">
		<Label><RadioGroup.Item value="default" /> Default</Label>
		<Label><RadioGroup.Item value="comfortable" /> Comfortable</Label>
		<Label><RadioGroup.Item value="compact" /> Compact</Label>
	</RadioGroup.Root>
	<p>Selected: {{ plan }}</p>
</template>

<style scoped>
p {
	margin: var(--dui-space-3) 0 0;
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-sm);
}
</style>
