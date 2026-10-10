<script setup lang="ts">
import {
	SelectContent,
	SelectViewport,
	useForwardPropsEmits,
	type SelectContentEmits,
	type SelectContentProps
} from 'reka-ui';
import { injectSelect } from './context.js';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<SelectContentProps>(), {
	position: 'popper',
	sideOffset: 4
});
const emits = defineEmits<SelectContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
const ctx = injectSelect();
</script>

<template>
	<!-- No portal: Reka positions the list with position: fixed, so it stays inside your styles. -->
	<SelectContent v-bind="forwarded" as-child>
		<div
			v-bind="$attrs"
			class="content"
			:aria-labelledby="ctx.hasLabel.value ? ctx.labelId : undefined"
		>
			<SelectViewport as-child>
				<div class="viewport"><slot /></div>
			</SelectViewport>
		</div>
	</SelectContent>
</template>

<!--
	Options you can set from a parent or on the select content itself:
	--dui-select-content-min-width, --dui-select-content-radius, --dui-select-content-bg, --dui-select-content-fg
-->

<style scoped>
/* Reka waits for animationend before removing the list, so it animates with
   the shared keyframes on [data-state]. */
.content {
	/* Reka copies this onto the positioning wrapper it puts around the list. */
	z-index: var(--dui-z-popover);
	min-width: max(var(--dui-select-content-min-width, 9rem), var(--reka-select-trigger-width));
	max-height: var(--reka-select-content-available-height);
	overflow-x: hidden;
	overflow-y: auto;
	outline: none;
	border-radius: var(--dui-select-content-radius, var(--dui-radius-md));
	background: var(--dui-select-content-bg, var(--dui-color-popover));
	color: var(--dui-select-content-fg, var(--dui-color-popover-foreground));
	box-shadow:
		0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
		var(--dui-shadow-md);

	&[data-state='open'] {
		animation: distill-zoom-in var(--dui-duration-fast) var(--dui-ease-out);
	}

	&[data-state='closed'] {
		animation: distill-zoom-out var(--dui-duration-fast) var(--dui-ease-out);
	}
}

.viewport {
	padding: var(--dui-space-1);
}
</style>
