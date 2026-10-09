<script lang="ts">
	import { Tabs } from '@distill-ui/svelte';
</script>

<Tabs.Root value="overview">
	<Tabs.List variant="line">
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
		<Tabs.Trigger value="reports">Reports</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview">The line variant.</Tabs.Content>
	<Tabs.Content value="analytics">Analytics content.</Tabs.Content>
	<Tabs.Content value="reports">Reports content.</Tabs.Content>
</Tabs.Root>
