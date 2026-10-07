<script lang="ts">
	import { Button } from '@distill-ui/svelte';
	import type { Component } from 'svelte';

	// Each option exports the same Dialog + Select API, so one demo covers all three.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type Parts = Record<string, Component<any>>;
	let { Dialog, Select }: { Dialog: Parts; Select: Parts } = $props();

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes', disabled: true },
		{ value: 'pineapple', label: 'Pineapple' }
	];
	let fruit = $state('');
</script>

<div class="row">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props }: { props: Record<string, unknown> })}
				<Button.Root variant="outline" {...props}>Edit profile</Button.Root>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<p>Dialog body content goes here.</p>
			<Dialog.Footer>
				<Dialog.Close>
					{#snippet child({ props }: { props: Record<string, unknown> })}
						<Button.Root variant="outline" {...props}>Cancel</Button.Root>
					{/snippet}
				</Dialog.Close>
				<Button.Root>Save changes</Button.Root>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>

	<Select.Root type="single" bind:value={fruit} items={fruits}>
		<Select.Trigger style="--select-trigger-width: 11rem">
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
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4);
	}
</style>
