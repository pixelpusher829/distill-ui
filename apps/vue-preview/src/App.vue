<script setup lang="ts">
// Every demo on one page, for development and the browser tests in tests/.
import AlertDemo from './demos/AlertDemo.vue';
import AlertDialogDemo from './demos/AlertDialogDemo.vue';
import AvatarDemo from './demos/AvatarDemo.vue';
import AvatarGroupDemo from './demos/AvatarGroupDemo.vue';
import BadgeDemo from './demos/BadgeDemo.vue';
import ButtonCustomDemo from './demos/ButtonCustomDemo.vue';
import ButtonDemo from './demos/ButtonDemo.vue';
import CardDemo from './demos/CardDemo.vue';
import CheckboxDemo from './demos/CheckboxDemo.vue';
import DialogDemo from './demos/DialogDemo.vue';
import DropdownMenuDemo from './demos/DropdownMenuDemo.vue';
import InputCustomDemo from './demos/InputCustomDemo.vue';
import InputDemo from './demos/InputDemo.vue';
import LabelDemo from './demos/LabelDemo.vue';
import PopoverDemo from './demos/PopoverDemo.vue';
import RadioGroupDemo from './demos/RadioGroupDemo.vue';
import SelectDemo from './demos/SelectDemo.vue';
import SeparatorDemo from './demos/SeparatorDemo.vue';
import SheetDemo from './demos/SheetDemo.vue';
import SkeletonDemo from './demos/SkeletonDemo.vue';
import SwitchCustomDemo from './demos/SwitchCustomDemo.vue';
import SwitchDemo from './demos/SwitchDemo.vue';
import TabsDemo from './demos/TabsDemo.vue';
import TabsLineDemo from './demos/TabsLineDemo.vue';
import TextareaDemo from './demos/TextareaDemo.vue';
import ToastDemo from './demos/ToastDemo.vue';
import TooltipDemo from './demos/TooltipDemo.vue';
import { Toaster } from '@distill-ui/vue';
</script>

<template>
	<main>
		<h1>All components</h1>
		<section data-testid="button">
			<h2>Button</h2>
			<ButtonDemo /><ButtonCustomDemo />
		</section>
		<section data-testid="inputs">
			<h2>Input, Textarea and Label</h2>
			<InputDemo /><InputCustomDemo /><TextareaDemo /><LabelDemo />
		</section>
		<section data-testid="checkbox">
			<h2>Checkbox</h2>
			<CheckboxDemo />
		</section>
		<section data-testid="radio-group">
			<h2>Radio Group</h2>
			<RadioGroupDemo />
		</section>
		<section data-testid="switch">
			<h2>Switch</h2>
			<SwitchDemo /><SwitchCustomDemo />
		</section>
		<section data-testid="card">
			<h2>Card</h2>
			<CardDemo />
		</section>
		<section data-testid="badge">
			<h2>Badge</h2>
			<BadgeDemo />
		</section>
		<section data-testid="separator">
			<h2>Separator</h2>
			<SeparatorDemo />
		</section>
		<section data-testid="skeleton">
			<h2>Skeleton</h2>
			<SkeletonDemo />
		</section>
		<section data-testid="avatar">
			<h2>Avatar</h2>
			<AvatarDemo /><AvatarGroupDemo />
		</section>
		<section data-testid="alert">
			<h2>Alert</h2>
			<AlertDemo />
		</section>
		<section data-testid="toast">
			<h2>Toast</h2>
			<ToastDemo />
		</section>
		<section data-testid="dialog">
			<h2>Dialog</h2>
			<DialogDemo />
		</section>
		<section data-testid="alert-dialog">
			<h2>Alert Dialog</h2>
			<AlertDialogDemo />
		</section>
		<section data-testid="sheet">
			<h2>Sheet</h2>
			<SheetDemo />
		</section>
		<section data-testid="dropdown-menu">
			<h2>Dropdown Menu</h2>
			<DropdownMenuDemo />
		</section>
		<section data-testid="popover">
			<h2>Popover</h2>
			<PopoverDemo />
		</section>
		<section data-testid="tooltip">
			<h2>Tooltip</h2>
			<TooltipDemo />
		</section>
		<section data-testid="select">
			<h2>Select</h2>
			<SelectDemo />
		</section>
		<section data-testid="tabs">
			<h2>Tabs</h2>
			<TabsDemo /><TabsLineDemo />
		</section>
	</main>
	<Toaster />
</template>

<style>
/* The same reset as the docs site, which most projects already have. */
*,
*::before,
*::after {
	box-sizing: border-box;
}

body {
	margin: 0;
	background: var(--dui-color-background);
	color: var(--dui-color-foreground);
	font-family: var(--dui-font-sans);
}
</style>

<style scoped>
main {
	max-width: 48rem;
	margin: 0 auto;
	padding: var(--dui-space-10) var(--dui-space-4);
}

main > section {
	display: grid;
	gap: var(--dui-space-4);
	justify-items: start;
	padding-block: var(--dui-space-6);
	border-top: 1px solid var(--dui-color-border);
}

main > section > h2 {
	margin: 0;
	font-size: var(--dui-text-base);
	font-weight: var(--dui-font-weight-medium);
}
</style>
