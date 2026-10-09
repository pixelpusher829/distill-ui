<script lang="ts">
	import { Alert } from '@distill-ui/svelte';
</script>

<div class="stack">
	<Alert.Root>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="12" cy="12" r="10" />
			<path d="m9 12 2 2 4-4" />
		</svg>
		<Alert.Title>Success! Your changes have been saved</Alert.Title>
		<Alert.Description>This is an alert with an icon, a title and a description.</Alert.Description>
	</Alert.Root>
	<Alert.Root variant="destructive">
		<Alert.Title>Unable to process your payment.</Alert.Title>
		<Alert.Description>Please verify your billing information and try again.</Alert.Description>
	</Alert.Root>
</div>

<style>
	.stack {
		display: grid;
		gap: var(--dui-space-3);
	}
</style>
