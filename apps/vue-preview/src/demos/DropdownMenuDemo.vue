<script setup lang="ts">
import { DropdownMenu } from '@distill-ui/vue';
import { ref } from 'vue';

const showStatusBar = ref(true);
const lastAction = ref('none');
</script>

<template>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
		<DropdownMenu.Content style="--dui-dropdown-menu-min-width: 14rem">
			<DropdownMenu.Label>My account</DropdownMenu.Label>
			<DropdownMenu.Group>
				<DropdownMenu.Item @select="lastAction = 'profile'">
					Profile <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item @select="lastAction = 'billing'">Billing</DropdownMenu.Item>
				<DropdownMenu.Item disabled>Team</DropdownMenu.Item>
				<DropdownMenu.Item @select="lastAction = 'settings'">Settings</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.CheckboxItem v-model="showStatusBar">Status bar</DropdownMenu.CheckboxItem>
			<DropdownMenu.Separator />
			<DropdownMenu.Item variant="destructive" @select="lastAction = 'logout'">
				Log out
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<p>Last action: {{ lastAction }}. Status bar: {{ showStatusBar ? 'on' : 'off' }}.</p>
</template>

<style scoped>
p {
	margin: var(--dui-space-3) 0 0;
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-sm);
}
</style>
