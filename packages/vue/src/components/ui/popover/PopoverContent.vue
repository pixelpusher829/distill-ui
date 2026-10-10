<script setup lang="ts">
import { PopoverContent } from 'reka-ui';
import { computed } from 'vue';
import { injectPopoverPlacement } from './context.js';
import { toSideAlign } from './placement.js';

defineOptions({ inheritAttrs: false });

const position = computed(() => toSideAlign(injectPopoverPlacement().value));
</script>

<template>
	<!-- No portal: Reka positions it with position: fixed, so it stays inside your styles. -->
	<PopoverContent :side="position.side" :align="position.align" :side-offset="4" as-child>
		<div v-bind="$attrs" class="content"><slot /></div>
	</PopoverContent>
</template>

<!--
	Options you can set from a parent or on the popover content itself:
	--dui-popover-width, --dui-popover-padding, --dui-popover-radius, --dui-popover-bg, --dui-popover-fg
-->

<style scoped>
.content {
	width: var(--dui-popover-width, 18rem);
	padding: var(--dui-popover-padding, var(--dui-space-4));
	border-radius: var(--dui-popover-radius, var(--dui-radius-md));
	background: var(--dui-popover-bg, var(--dui-color-popover));
	color: var(--dui-popover-fg, var(--dui-color-popover-foreground));
	box-shadow:
		0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
		var(--dui-shadow-md);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	outline: none;
	/* Reka copies this onto the positioning wrapper it puts around the content. */
	z-index: var(--dui-z-popover);

	/* Reka waits for animationend before removing it, so this uses the shared keyframes. */
	&[data-state='open'] {
		animation: distill-zoom-in var(--dui-duration-fast) var(--dui-ease-out);
	}

	&[data-state='closed'] {
		animation: distill-zoom-out var(--dui-duration-fast) var(--dui-ease-out);
	}
}
</style>
