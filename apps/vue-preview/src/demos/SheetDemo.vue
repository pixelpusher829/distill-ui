<script setup lang="ts">
import { Button, Input, Label, Sheet } from '@distill-ui/vue';

const sides = ['top', 'right', 'bottom', 'left'] as const;
</script>

<template>
	<div class="row">
		<Sheet.Root v-for="side in sides" :key="side">
			<Sheet.Trigger variant="outline">Open {{ side }}</Sheet.Trigger>
			<Sheet.Content :side="side">
				<Sheet.Header>
					<Sheet.Title>Edit profile</Sheet.Title>
					<Sheet.Description>Make changes to your profile here.</Sheet.Description>
				</Sheet.Header>
				<div class="field">
					<Label :for="`sheet-name-${side}`">Name</Label>
					<Input :id="`sheet-name-${side}`" model-value="James" />
				</div>
				<Sheet.Footer>
					<Button>Save changes</Button>
					<Sheet.Close>Close</Sheet.Close>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</template>

<style scoped>
.row {
	display: flex;
	flex-wrap: wrap;
	gap: var(--dui-space-2);
}

.field {
	display: grid;
	gap: var(--dui-space-2);
	padding-inline: var(--dui-space-4);
}
</style>
