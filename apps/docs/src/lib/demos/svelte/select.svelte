<script lang="ts">
	import { Select } from '@distill-ui/svelte';

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes', disabled: true },
		{ value: 'pineapple', label: 'Pineapple' }
	];
	let fruit = $state('');
</script>

<Select.Root bind:value={fruit}>
	<Select.Label>Favorite fruit</Select.Label>
	<Select.Trigger style="--dui-select-trigger-width: 11rem">
		<Select.Value placeholder="Select a fruit" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.GroupHeading>Fruits</Select.GroupHeading>
			{#each fruits as f (f.value)}
				<Select.Item value={f.value} label={f.label} disabled={f.disabled} />
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
