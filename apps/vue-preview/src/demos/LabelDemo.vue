<script setup lang="ts">
import { Checkbox, Input, Label } from '@distill-ui/vue';
</script>

<template>
	<div class="field">
		<Label for="name">Name</Label>
		<Input id="name" placeholder="Ada Lovelace" />
	</div>
	<Label><Checkbox /> Wrap a control to label it without an id</Label>
</template>

<style scoped>
.field {
	display: grid;
	gap: var(--dui-space-2);
	width: min(100%, 20rem);
	margin-bottom: var(--dui-space-4);
}
</style>
