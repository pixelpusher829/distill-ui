<script setup lang="ts">
import { Select } from '@distill-ui/vue';
import { ref } from 'vue';

const fruits = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'blueberry', label: 'Blueberry' },
	{ value: 'grapes', label: 'Grapes', disabled: true },
	{ value: 'pineapple', label: 'Pineapple' }
];
const fruit = ref('');
</script>

<template>
	<Select.Root v-model="fruit">
		<Select.Label>Favorite fruit</Select.Label>
		<Select.Trigger style="--dui-select-trigger-width: 11rem">
			<Select.Value placeholder="Select a fruit" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.GroupHeading>Fruits</Select.GroupHeading>
				<Select.Item
					v-for="f in fruits"
					:key="f.value"
					:value="f.value"
					:label="f.label"
					:disabled="f.disabled"
				/>
			</Select.Group>
		</Select.Content>
	</Select.Root>
</template>
