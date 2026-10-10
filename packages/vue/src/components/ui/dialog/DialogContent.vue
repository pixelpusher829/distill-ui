<script setup lang="ts">
import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	useForwardPropsEmits,
	type DialogContentEmits,
	type DialogContentProps
} from 'reka-ui';
import { computed } from 'vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DialogContentProps & { showCloseButton?: boolean }>(), {
	showCloseButton: true
});
const emits = defineEmits<DialogContentEmits>();
const forwarded = useForwardPropsEmits(
	computed(() => {
		const { showCloseButton, ...rest } = props;
		return rest;
	}),
	emits
);
</script>

<template>
	<!-- No portal: the content is position: fixed, so it stays inside your styles and tokens. -->
	<DialogOverlay as-child>
		<div class="overlay"></div>
	</DialogOverlay>
	<DialogContent v-bind="forwarded" as-child>
		<div v-bind="$attrs" class="content">
			<slot />
			<DialogClose v-if="showCloseButton" as-child>
				<button type="button" class="close">
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
					<span class="sr-only">Close</span>
				</button>
			</DialogClose>
		</div>
	</DialogContent>
</template>

<!--
	Options you can set from a parent or on the dialog content itself:
	--dui-dialog-overlay-bg, --dui-dialog-max-width, --dui-dialog-padding, --dui-dialog-radius, --dui-dialog-bg, --dui-dialog-fg
-->

<style scoped>
/* Reka waits for animationend before removing the dialog, so this animates with
   the shared keyframes on [data-state] rather than transitions. */
.overlay {
	position: fixed;
	inset: 0;
	z-index: var(--dui-z-overlay);
	background: var(--dui-dialog-overlay-bg, var(--dui-color-overlay));
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
	max-width: min(var(--dui-dialog-max-width, 28rem), calc(100% - var(--dui-space-8)));
	height: fit-content;
	margin: auto;
	padding: var(--dui-dialog-padding, var(--dui-space-6));
	border-radius: var(--dui-dialog-radius, var(--dui-radius-xl));
	background: var(--dui-dialog-bg, var(--dui-color-popover));
	color: var(--dui-dialog-fg, var(--dui-color-popover-foreground));
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

.close {
	position: absolute;
	top: var(--dui-space-4);
	right: var(--dui-space-4);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.75rem;
	height: 1.75rem;
	border: none;
	border-radius: var(--dui-radius-md);
	background: transparent;
	color: var(--dui-color-foreground);
	cursor: pointer;
	opacity: 0.7;
	transition: opacity var(--dui-duration-fast) var(--dui-ease-out);

	&:hover {
		opacity: 1;
		background: var(--dui-color-muted);
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 var(--dui-ring-width)
			color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
	}

	svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip-path: inset(50%);
	white-space: nowrap;
	border: 0;
}
</style>
