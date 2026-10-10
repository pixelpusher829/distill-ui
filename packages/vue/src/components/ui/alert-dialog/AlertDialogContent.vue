<script setup lang="ts">
import {
	AlertDialogContent,
	AlertDialogOverlay,
	useForwardPropsEmits,
	type AlertDialogContentEmits,
	type AlertDialogContentProps
} from 'reka-ui';

defineOptions({ inheritAttrs: false });

// An alert dialog needs an answer, so Reka doesn't close it on an outside click.
const props = defineProps<AlertDialogContentProps>();
const emits = defineEmits<AlertDialogContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<!-- No portal: the content is position: fixed, so it stays inside your styles and tokens. -->
	<AlertDialogOverlay as-child>
		<div class="overlay"></div>
	</AlertDialogOverlay>
	<AlertDialogContent v-bind="forwarded" as-child>
		<div v-bind="$attrs" class="content"><slot /></div>
	</AlertDialogContent>
</template>

<!--
	Options you can set from a parent or on the alert dialog content itself:
	--dui-alert-dialog-overlay-bg, --dui-alert-dialog-max-width, --dui-alert-dialog-padding, --dui-alert-dialog-radius, --dui-alert-dialog-bg, --dui-alert-dialog-fg
-->

<style scoped>
/* Reka waits for animationend before removing the dialog, so this animates with
   the shared keyframes on [data-state] rather than transitions. */
.overlay {
	position: fixed;
	inset: 0;
	z-index: var(--dui-z-overlay);
	background: var(--dui-alert-dialog-overlay-bg, var(--dui-color-overlay));
	backdrop-filter: blur(4px);

	&[data-state='open'] {
		animation: distill-fade-in var(--dui-duration-fast) var(--dui-ease-out);
	}

	&[data-state='closed'] {
		animation: distill-fade-out var(--dui-duration-fast) var(--dui-ease-out);
	}
}

.content {
	position: fixed;
	inset: 0;
	z-index: var(--dui-z-modal);
	display: grid;
	gap: var(--dui-space-6);
	width: 100%;
	max-width: min(var(--dui-alert-dialog-max-width, 32rem), calc(100% - var(--dui-space-8)));
	height: fit-content;
	margin: auto;
	padding: var(--dui-alert-dialog-padding, var(--dui-space-6));
	border-radius: var(--dui-alert-dialog-radius, var(--dui-radius-xl));
	background: var(--dui-alert-dialog-bg, var(--dui-color-popover));
	color: var(--dui-alert-dialog-fg, var(--dui-color-popover-foreground));
	box-shadow: 0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	outline: none;

	&[data-state='open'] {
		animation: distill-zoom-in var(--dui-duration-fast) var(--dui-ease-out);
	}

	&[data-state='closed'] {
		animation: distill-zoom-out var(--dui-duration-fast) var(--dui-ease-out);
	}
}
</style>
