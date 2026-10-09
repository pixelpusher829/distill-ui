<script lang="ts">
	// Every demo on one page, for the browser tests in tests/components.test.ts.
	import AlertDialog from '#lib/demos/svelte/alert-dialog.svelte';
	import Alert from '#lib/demos/svelte/alert.svelte';
	import AvatarGroup from '#lib/demos/svelte/avatar-group.svelte';
	import Avatar from '#lib/demos/svelte/avatar.svelte';
	import Badge from '#lib/demos/svelte/badge.svelte';
	import ButtonCustom from '#lib/demos/svelte/button-custom.svelte';
	import Button from '#lib/demos/svelte/button.svelte';
	import Card from '#lib/demos/svelte/card.svelte';
	import Checkbox from '#lib/demos/svelte/checkbox.svelte';
	import Dialog from '#lib/demos/svelte/dialog.svelte';
	import DropdownMenu from '#lib/demos/svelte/dropdown-menu.svelte';
	import InputCustom from '#lib/demos/svelte/input-custom.svelte';
	import Input from '#lib/demos/svelte/input.svelte';
	import Label from '#lib/demos/svelte/label.svelte';
	import Popover from '#lib/demos/svelte/popover.svelte';
	import RadioGroup from '#lib/demos/svelte/radio-group.svelte';
	import Select from '#lib/demos/svelte/select.svelte';
	import Separator from '#lib/demos/svelte/separator.svelte';
	import Sheet from '#lib/demos/svelte/sheet.svelte';
	import Skeleton from '#lib/demos/svelte/skeleton.svelte';
	import SwitchCustom from '#lib/demos/svelte/switch-custom.svelte';
	import Switch from '#lib/demos/svelte/switch.svelte';
	import TabsLine from '#lib/demos/svelte/tabs-line.svelte';
	import Tabs from '#lib/demos/svelte/tabs.svelte';
	import Textarea from '#lib/demos/svelte/textarea.svelte';
	import Toast from '#lib/demos/svelte/toast.svelte';
	import Tooltip from '#lib/demos/svelte/tooltip.svelte';
</script>

<svelte:head>
	<title>All components · distill-ui</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main>
	<h1>All components</h1>
	<section data-testid="button">
		<h2>Button</h2>
		<Button /><ButtonCustom />
	</section>
	<section data-testid="inputs">
		<h2>Input, Textarea and Label</h2>
		<Input /><InputCustom /><Textarea /><Label />
	</section>
	<section data-testid="checkbox">
		<h2>Checkbox</h2>
		<Checkbox />
	</section>
	<section data-testid="radio-group">
		<h2>Radio Group</h2>
		<RadioGroup />
	</section>
	<section data-testid="switch">
		<h2>Switch</h2>
		<Switch /><SwitchCustom />
	</section>
	<section data-testid="card">
		<h2>Card</h2>
		<Card />
	</section>
	<section data-testid="badge">
		<h2>Badge</h2>
		<Badge />
	</section>
	<section data-testid="separator">
		<h2>Separator</h2>
		<Separator />
	</section>
	<section data-testid="skeleton">
		<h2>Skeleton</h2>
		<Skeleton />
	</section>
	<section data-testid="avatar">
		<h2>Avatar</h2>
		<Avatar /><AvatarGroup />
	</section>
	<section data-testid="alert">
		<h2>Alert</h2>
		<Alert />
	</section>
	<section data-testid="toast">
		<h2>Toast</h2>
		<Toast />
	</section>
	<section data-testid="dialog">
		<h2>Dialog</h2>
		<Dialog />
	</section>
	<section data-testid="alert-dialog">
		<h2>Alert Dialog</h2>
		<AlertDialog />
	</section>
	<section data-testid="sheet">
		<h2>Sheet</h2>
		<Sheet />
	</section>
	<section data-testid="dropdown-menu">
		<h2>Dropdown Menu</h2>
		<DropdownMenu />
	</section>
	<section data-testid="popover">
		<h2>Popover</h2>
		<Popover />
	</section>
	<section data-testid="tooltip">
		<h2>Tooltip</h2>
		<Tooltip />
	</section>
	<section data-testid="select">
		<h2>Select</h2>
		<Select />
	</section>
	<section data-testid="tabs">
		<h2>Tabs</h2>
		<Tabs /><TabsLine />
	</section>
</main>

<style>
	main {
		max-width: 48rem;
		margin: 0 auto;
		padding: var(--dui-space-10) var(--dui-space-4);
	}

	section {
		display: grid;
		gap: var(--dui-space-4);
		padding-block: var(--dui-space-6);
		border-top: 1px solid var(--dui-color-border);
	}

	h2 {
		margin: 0;
		font-size: var(--dui-text-base);
		font-weight: var(--dui-font-weight-medium);
	}
</style>
