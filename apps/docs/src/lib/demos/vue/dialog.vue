<script setup lang="ts">
import { Button, Dialog } from '@distill-ui/vue';
</script>

<template>
	<Dialog.Root>
		<Dialog.Trigger variant="outline">Edit profile</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<p>Dialog body content goes here.</p>
			<Dialog.Footer>
				<Dialog.Close>Cancel</Dialog.Close>
				<Button>Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</template>
