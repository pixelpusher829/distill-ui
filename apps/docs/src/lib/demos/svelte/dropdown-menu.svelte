<script lang="ts">
	import { DropdownMenu } from '@distill-ui/svelte';

	let showStatusBar = $state(true);
	let lastAction = $state('none');
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
	<DropdownMenu.Content style="--dui-dropdown-menu-min-width: 14rem">
		<DropdownMenu.Label>My account</DropdownMenu.Label>
		<DropdownMenu.Group>
			<DropdownMenu.Item onSelect={() => (lastAction = 'profile')}>
				Profile <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item onSelect={() => (lastAction = 'billing')}>Billing</DropdownMenu.Item>
			<DropdownMenu.Item disabled>Team</DropdownMenu.Item>
			<DropdownMenu.Item onSelect={() => (lastAction = 'settings')}>Settings</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>Status bar</DropdownMenu.CheckboxItem>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive" onSelect={() => (lastAction = 'logout')}>
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
<p>Last action: {lastAction}. Status bar: {showStatusBar ? 'on' : 'off'}.</p>

<style>
	p {
		margin: var(--dui-space-3) 0 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
	}
</style>
