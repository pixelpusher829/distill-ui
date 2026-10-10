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

const props = withDefaults(
	defineProps<
		DialogContentProps & { showCloseButton?: boolean; side?: 'top' | 'right' | 'bottom' | 'left' }
	>(),
	{ showCloseButton: true, side: 'right' }
);
const emits = defineEmits<DialogContentEmits>();
const forwarded = useForwardPropsEmits(
	computed(() => {
		const { showCloseButton, side, ...rest } = props;
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
		<div v-bind="$attrs" class="content" :data-side="side">
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
	Options you can set from a parent or on the sheet content itself:
	--dui-sheet-overlay-bg, --dui-sheet-padding, --dui-sheet-bg, --dui-sheet-fg, --dui-sheet-size
-->

<style scoped>
/* Reka waits for animationend before removing the sheet, so it animates with
   keyframes on [data-state] rather than transitions. */
.overlay {
	position: fixed;
	inset: 0;
	z-index: var(--dui-z-overlay);
	background: var(--dui-sheet-overlay-bg, var(--dui-color-overlay));
	backdrop-filter: blur(4px);

	&[data-state='open'] {
		animation: distill-fade-in var(--dui-duration-slow) var(--dui-ease-in-out);
	}

	&[data-state='closed'] {
		animation: distill-fade-out var(--dui-duration-slow) var(--dui-ease-in-out);
	}
}

.content {
	position: fixed;
	z-index: var(--dui-z-modal);
	display: flex;
	flex-direction: column;
	gap: var(--dui-space-4);
	padding: var(--dui-sheet-padding, var(--dui-space-6));
	background: var(--dui-sheet-bg, var(--dui-color-background));
	color: var(--dui-sheet-fg, var(--dui-color-foreground));
	box-shadow:
		0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
		var(--dui-shadow-lg);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	outline: none;

	&[data-state='open'] {
		animation: sheet-in var(--dui-duration-slow) var(--dui-ease-in-out);
	}

	&[data-state='closed'] {
		animation: sheet-out var(--dui-duration-slow) var(--dui-ease-in-out);
	}
}

/* Each side pins the sheet to that edge; --from is where it slides in from. */
.content[data-side='right'] {
	--from: 100% 0;

	inset: 0 0 0 auto;
	width: min(var(--dui-sheet-size, 24rem), 75%);
}

.content[data-side='left'] {
	--from: -100% 0;

	inset: 0 auto 0 0;
	width: min(var(--dui-sheet-size, 24rem), 75%);
}

.content[data-side='top'] {
	--from: 0 -100%;

	inset: 0 0 auto 0;
}

.content[data-side='bottom'] {
	--from: 0 100%;

	inset: auto 0 0 0;
}

@keyframes sheet-in {
	from {
		translate: var(--from);
	}
}

@keyframes sheet-out {
	to {
		translate: var(--from);
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
