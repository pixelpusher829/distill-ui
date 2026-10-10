<script setup lang="ts">
import { Label, Textarea } from '@distill-ui/vue';
</script>

<template>
	<div class="field">
		<Label for="message">Message</Label>
		<Textarea id="message" placeholder="Type your message here." />
	</div>
</template>

<style scoped>
.field {
	display: grid;
	gap: var(--dui-space-2);
	width: min(100%, 20rem);
}
</style>
