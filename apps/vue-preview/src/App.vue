<script setup lang="ts">
// Every demo on one page, for development and the browser tests in tests/. The demos live
// in the docs app, next to the Svelte ones, so the docs show the same code.
import AlertDemo from '../../docs/src/lib/demos/vue/alert.vue';
import AlertDialogDemo from '../../docs/src/lib/demos/vue/alert-dialog.vue';
import AvatarDemo from '../../docs/src/lib/demos/vue/avatar.vue';
import AvatarGroupDemo from '../../docs/src/lib/demos/vue/avatar-group.vue';
import BadgeDemo from '../../docs/src/lib/demos/vue/badge.vue';
import ButtonCustomDemo from '../../docs/src/lib/demos/vue/button-custom.vue';
import ButtonDemo from '../../docs/src/lib/demos/vue/button.vue';
import CardDemo from '../../docs/src/lib/demos/vue/card.vue';
import CheckboxDemo from '../../docs/src/lib/demos/vue/checkbox.vue';
import DialogDemo from '../../docs/src/lib/demos/vue/dialog.vue';
import DropdownMenuDemo from '../../docs/src/lib/demos/vue/dropdown-menu.vue';
import InputCustomDemo from '../../docs/src/lib/demos/vue/input-custom.vue';
import InputDemo from '../../docs/src/lib/demos/vue/input.vue';
import LabelDemo from '../../docs/src/lib/demos/vue/label.vue';
import PopoverDemo from '../../docs/src/lib/demos/vue/popover.vue';
import RadioGroupDemo from '../../docs/src/lib/demos/vue/radio-group.vue';
import SelectDemo from '../../docs/src/lib/demos/vue/select.vue';
import SeparatorDemo from '../../docs/src/lib/demos/vue/separator.vue';
import SheetDemo from '../../docs/src/lib/demos/vue/sheet.vue';
import SkeletonDemo from '../../docs/src/lib/demos/vue/skeleton.vue';
import SwitchCustomDemo from '../../docs/src/lib/demos/vue/switch-custom.vue';
import SwitchDemo from '../../docs/src/lib/demos/vue/switch.vue';
import TabsDemo from '../../docs/src/lib/demos/vue/tabs.vue';
import TabsLineDemo from '../../docs/src/lib/demos/vue/tabs-line.vue';
import TextareaDemo from '../../docs/src/lib/demos/vue/textarea.vue';
import ToastDemo from '../../docs/src/lib/demos/vue/toast.vue';
import TooltipDemo from '../../docs/src/lib/demos/vue/tooltip.vue';
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
