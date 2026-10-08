<script lang="ts">
	import { Button, Dialog, Select, Tabs } from '@distill-ui/svelte';

	let dark = $state(false);
	$effect(() => {
		document.documentElement.dataset.theme = dark ? 'dark' : 'light';
	});

	const fruits = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'grapes', label: 'Grapes', disabled: true },
		{ value: 'pineapple', label: 'Pineapple' }
	];
	let fruit = $state('');

	const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
</script>

<svelte:head>
	<title>Components · distill-ui</title>
</svelte:head>

<main>
	<header>
		<h1>Components</h1>
		<Button variant="ghost" size="sm" onclick={() => (dark = !dark)}>
			{dark ? 'Light' : 'Dark'} mode
		</Button>
	</header>

	<section data-testid="button">
		<h2>Button</h2>
		<div class="row">
			{#each variants as variant (variant)}
				<Button {variant}>{variant}</Button>
			{/each}
		</div>
		<div class="row">
			<Button size="sm">Small</Button>
			<Button>Medium</Button>
			<Button size="lg">Large</Button>
			<Button size="icon" aria-label="Add">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 5v14M5 12h14" />
				</svg>
			</Button>
			<Button disabled>Disabled</Button>
		</div>
		<h3>Customizing</h3>
		<div
			class="row"
			style="--button-bg: oklch(0.55 0.2 260); --button-fg: white; --button-radius: 9999px"
		>
			<Button>Overridden from a parent</Button>
		</div>
	</section>

	<section data-testid="dialog">
		<h2>Dialog</h2>
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
	</section>

	<section data-testid="select">
		<h2>Select</h2>
		<Select.Root bind:value={fruit}>
			<Select.Label>Favorite fruit</Select.Label>
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
	</section>

	<section data-testid="tabs">
		<h2>Tabs</h2>
		<div class="stack">
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
		</div>
	</section>
</main>

<style>
	main {
		max-width: 48rem;
		margin: 0 auto;
		padding: var(--space-10) var(--space-4);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	section {
		padding-block: var(--space-6);
		border-top: 1px solid var(--color-border);
	}

	h2,
	h3 {
		margin: 0 0 var(--space-4);
		font-size: var(--text-base);
		font-weight: var(--font-weight-medium);
	}

	h3 {
		margin-top: var(--space-6);
		color: var(--color-muted-foreground);
		font-size: var(--text-sm);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	.stack {
		display: grid;
		gap: var(--space-8);
	}
</style>
