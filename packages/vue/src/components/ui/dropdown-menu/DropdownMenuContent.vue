<script setup lang="ts">
import { DropdownMenuContent } from 'reka-ui';
import { computed, useTemplateRef } from 'vue';
import { injectDropdownMenu } from './context.js';
import { toSideAlign } from './placement.js';

defineOptions({ inheritAttrs: false });

const menu = injectDropdownMenu();
const position = computed(() => toSideAlign(menu.placement.value));
const el = useTemplateRef<HTMLElement>('el');

// Opened with ArrowUp on the trigger: start on the last item that can be picked.
function onOpenAutoFocus(event: Event) {
	if (!menu.focusLast.value) return;
	menu.focusLast.value = false;
	event.preventDefault();
	const items = el.value?.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([data-disabled])');
	items?.[items.length - 1]?.focus();
}
</script>

<template>
	<!-- No portal: Reka positions it with position: fixed, so it stays inside your styles. -->
	<DropdownMenuContent
		:side="position.side"
		:align="position.align"
		:side-offset="4"
		as-child
		@open-auto-focus="onOpenAutoFocus"
	>
		<div ref="el" v-bind="$attrs" class="content"><slot /></div>
	</DropdownMenuContent>
</template>

<!--
	Options you can set from a parent or on the dropdown menu content itself:
	--dui-dropdown-menu-min-width, --dui-dropdown-menu-radius, --dui-dropdown-menu-bg, --dui-dropdown-menu-fg
-->

<style scoped>
.content {
	min-width: var(--dui-dropdown-menu-min-width, 8rem);
	max-height: var(--reka-dropdown-menu-content-available-height);
	padding: var(--dui-space-1);
	overflow-x: hidden;
	overflow-y: auto;
	border-radius: var(--dui-dropdown-menu-radius, var(--dui-radius-md));
	background: var(--dui-dropdown-menu-bg, var(--dui-color-popover));
	color: var(--dui-dropdown-menu-fg, var(--dui-color-popover-foreground));
	box-shadow:
		0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
		var(--dui-shadow-md);
	outline: none;
	/* Reka copies this onto the positioning wrapper it puts around the menu. */
	z-index: var(--dui-z-dropdown);

	/* Reka waits for animationend before removing it, so this uses the shared keyframes. */
	&[data-state='open'] {
		animation: distill-zoom-in var(--dui-duration-fast) var(--dui-ease-out);
	}

	&[data-state='closed'] {
		animation: distill-zoom-out var(--dui-duration-fast) var(--dui-ease-out);
	}
}
</style>
