<script lang="ts">
	import {
		AlertDialog,
		Avatar,
		Badge,
		Button,
		Card,
		Checkbox,
		Dialog,
		DropdownMenu,
		Input,
		Label,
		Popover,
		RadioGroup,
		Select,
		Separator,
		Sheet,
		Skeleton,
		Switch,
		Tabs,
		Textarea,
		Tooltip
	} from '@distill-ui/svelte';

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

	let plan = $state('comfortable');
	let terms = $state(false);
	let airplane = $state(false);

	let showStatusBar = $state(true);
	let lastAction = $state('none');
	const sides = ['top', 'right', 'bottom', 'left'] as const;

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

	<section data-testid="inputs">
		<h2>Input, Textarea and Label</h2>
		<div class="field">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="you@example.com" />
		</div>
		<div class="field">
			<Label for="invalid">Username</Label>
			<Input id="invalid" value="taken" aria-invalid="true" aria-describedby="invalid-hint" />
			<p id="invalid-hint" class="hint">That username is taken.</p>
		</div>
		<div class="field">
			<Label for="picture">Picture</Label>
			<Input id="picture" type="file" />
		</div>
		<div class="field">
			<Label for="disabled-input">Disabled</Label>
			<Input id="disabled-input" disabled placeholder="Can't type here" />
		</div>
		<div class="field">
			<Label for="message">Message</Label>
			<Textarea id="message" placeholder="Type your message here." />
		</div>
		<h3>Customizing</h3>
		<div class="field" style="--input-radius: 9999px; --input-height: 2.75rem">
			<Label for="pill">Pill input</Label>
			<Input id="pill" placeholder="Rounded from a parent" />
		</div>
	</section>

	<section data-testid="checkbox">
		<h2>Checkbox</h2>
		<div class="stack-sm">
			<Label><Checkbox bind:checked={terms} /> Accept terms and conditions</Label>
			<Label><Checkbox indeterminate /> Some items selected</Label>
			<Label><Checkbox disabled /> Disabled</Label>
		</div>
	</section>

	<section data-testid="radio-group">
		<h2>Radio Group</h2>
		<RadioGroup.Root bind:value={plan} aria-label="Spacing">
			<Label><RadioGroup.Item value="default" /> Default</Label>
			<Label><RadioGroup.Item value="comfortable" /> Comfortable</Label>
			<Label><RadioGroup.Item value="compact" /> Compact</Label>
		</RadioGroup.Root>
		<p class="hint spaced">Selected: {plan}</p>
	</section>

	<section data-testid="switch">
		<h2>Switch</h2>
		<div class="stack-sm">
			<Label><Switch bind:checked={airplane} /> Airplane mode</Label>
			<Label><Switch size="sm" /> Small</Label>
			<Label><Switch disabled /> Disabled</Label>
		</div>
		<h3>Customizing</h3>
		<div style="--switch-checked-track: oklch(0.6 0.17 150)">
			<Label><Switch checked /> Green from a parent</Label>
		</div>
	</section>

	<section data-testid="card">
		<h2>Card</h2>
		<div class="cards">
			<Card.Root>
				<Card.Header>
					<Card.Title>Login to your account</Card.Title>
					<Card.Description>Enter your email below to login.</Card.Description>
					<Card.Action><Button variant="link">Sign up</Button></Card.Action>
				</Card.Header>
				<Card.Content>
					<div class="field">
						<Label for="card-email">Email</Label>
						<Input id="card-email" type="email" placeholder="you@example.com" />
					</div>
				</Card.Content>
				<Card.Footer>
					<Button>Login</Button>
					<Button variant="outline">Cancel</Button>
				</Card.Footer>
			</Card.Root>
			<Card.Root size="sm" style="--card-radius: 0">
				<Card.Header>
					<Card.Title>Small card</Card.Title>
					<Card.Description>Tighter spacing, and square corners set from outside.</Card.Description>
				</Card.Header>
				<Card.Content>Content goes here.</Card.Content>
			</Card.Root>
		</div>
	</section>

	<section data-testid="badge">
		<h2>Badge</h2>
		<div class="row">
			{#each variants as variant (variant)}
				<Badge {variant}>{variant}</Badge>
			{/each}
			<Badge href="#badge" variant="outline">A link</Badge>
		</div>
	</section>

	<section data-testid="separator">
		<h2>Separator</h2>
		<p class="hint">An open-source UI library.</p>
		<Separator style="margin-block: var(--space-4)" />
		<div class="row" style="height: 1.25rem">
			<span>Blog</span>
			<Separator orientation="vertical" />
			<span>Docs</span>
			<Separator orientation="vertical" />
			<span>Source</span>
		</div>
	</section>

	<section data-testid="skeleton">
		<h2>Skeleton</h2>
		<div class="row">
			<Skeleton style="width: 3rem; height: 3rem; border-radius: 9999px" />
			<div class="stack-sm">
				<Skeleton style="width: 15rem; height: 1rem" />
				<Skeleton style="width: 12rem; height: 1rem" />
			</div>
		</div>
	</section>

	<section data-testid="avatar">
		<h2>Avatar</h2>
		<div class="row">
			<Avatar.Root>
				<Avatar.Image src="/avatar.svg" alt="Profile picture" />
				<Avatar.Fallback>JB</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root>
				<Avatar.Image src="/missing.png" alt="Missing picture" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<Avatar.Root size="sm"><Avatar.Fallback>SM</Avatar.Fallback></Avatar.Root>
			<Avatar.Root size="lg"><Avatar.Fallback>LG</Avatar.Fallback></Avatar.Root>
		</div>
		<h3>Group</h3>
		<Avatar.Group>
			<Avatar.Root
				><Avatar.Image src="/avatar.svg" alt="Ada" /><Avatar.Fallback>AD</Avatar.Fallback
				></Avatar.Root
			>
			<Avatar.Root><Avatar.Fallback>BO</Avatar.Fallback></Avatar.Root>
			<Avatar.Root><Avatar.Fallback>CY</Avatar.Fallback></Avatar.Root>
		</Avatar.Group>
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

	<section data-testid="alert-dialog">
		<h2>Alert Dialog</h2>
		<AlertDialog.Root>
			<AlertDialog.Trigger variant="outline">Delete account</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete your account.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action>Continue</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</section>

	<section data-testid="sheet">
		<h2>Sheet</h2>
		<div class="row">
			{#each sides as side (side)}
				<Sheet.Root>
					<Sheet.Trigger variant="outline">Open {side}</Sheet.Trigger>
					<Sheet.Content {side}>
						<Sheet.Header>
							<Sheet.Title>Edit profile</Sheet.Title>
							<Sheet.Description>Make changes to your profile here.</Sheet.Description>
						</Sheet.Header>
						<div class="field">
							<Label for="sheet-name-{side}">Name</Label>
							<Input id="sheet-name-{side}" value="James" />
						</div>
						<Sheet.Footer>
							<Button>Save changes</Button>
							<Sheet.Close>Close</Sheet.Close>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			{/each}
		</div>
	</section>

	<section data-testid="dropdown-menu">
		<h2>Dropdown Menu</h2>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>Open menu</DropdownMenu.Trigger>
			<DropdownMenu.Content style="--dropdown-menu-min-width: 14rem">
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
				<DropdownMenu.CheckboxItem bind:checked={showStatusBar}
					>Status bar</DropdownMenu.CheckboxItem
				>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive" onSelect={() => (lastAction = 'logout')}>
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<p class="hint spaced">
			Last action: {lastAction}. Status bar: {showStatusBar ? 'on' : 'off'}.
		</p>
	</section>

	<section data-testid="popover">
		<h2>Popover</h2>
		<Popover.Root>
			<Popover.Trigger>Open popover</Popover.Trigger>
			<Popover.Content>
				<div class="stack-sm">
					<strong>Dimensions</strong>
					<div class="field">
						<Label for="popover-width">Width</Label>
						<Input id="popover-width" value="100%" />
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	</section>

	<section data-testid="tooltip">
		<h2>Tooltip</h2>
		<Tooltip.Root>
			<Tooltip.Trigger>Hover me</Tooltip.Trigger>
			<Tooltip.Content>Add to library</Tooltip.Content>
		</Tooltip.Root>
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

	.field {
		display: grid;
		gap: var(--space-2);
		max-width: 20rem;
		margin-bottom: var(--space-4);
	}

	.hint {
		margin: 0;
		color: var(--color-muted-foreground);
		font-size: var(--text-sm);
	}

	.spaced {
		margin-top: var(--space-3);
	}

	.stack-sm {
		display: grid;
		gap: var(--space-3);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		align-items: start;
		gap: var(--space-4);
	}

	.stack {
		display: grid;
		gap: var(--space-8);
	}
</style>
