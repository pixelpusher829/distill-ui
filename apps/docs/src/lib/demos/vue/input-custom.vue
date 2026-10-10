<script setup lang="ts">
import { Input, Label } from '@distill-ui/vue';
</script>

<template>
	<div class="field" style="--dui-input-radius: 9999px; --dui-input-height: 2.75rem">
		<Label for="pill">Pill input</Label>
		<Input id="pill" placeholder="Rounded from a parent" />
	</div>
</template>

<style scoped>
.field {
	display: grid;
	gap: var(--dui-space-2);
	width: min(100%, 20rem);
}
</style>
