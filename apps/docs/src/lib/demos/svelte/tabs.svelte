<script lang="ts">
	import { Tabs } from '@distill-ui/svelte';
</script>

<Tabs.Root value="account">
	<Tabs.List>
		<Tabs.Trigger value="account">Account</Tabs.Trigger>
		<Tabs.Trigger value="password">Password</Tabs.Trigger>
		<Tabs.Trigger value="billing" disabled>Billing</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
	<Tabs.Content value="password">Change your password here.</Tabs.Content>
	<Tabs.Content value="billing">Billing details.</Tabs.Content>
</Tabs.Root>
