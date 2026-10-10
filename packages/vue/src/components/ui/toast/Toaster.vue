<script setup lang="ts">
import { toaster } from './toaster.js';
</script>

<template>
	<section
		class="toaster"
		aria-label="Notifications"
		@mouseenter="toaster.pause()"
		@mouseleave="toaster.resume()"
	>
		<div
			v-for="t in toaster.toasts"
			:key="t.id"
			role="alert"
			class="toast"
			:data-variant="t.data.variant ?? 'default'"
		>
			<div class="text">
				<div class="title">{{ t.data.title }}</div>
				<div v-if="t.data.description" class="description">{{ t.data.description }}</div>
			</div>
			<button
				v-if="t.data.action"
				type="button"
				class="action"
				@click="
					t.data.action.onClick();
					toaster.remove(t.id);
				"
			>
				{{ t.data.action.label }}
			</button>
			<button type="button" class="close" aria-label="Close" @click="toaster.remove(t.id)">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</button>
		</div>
	</section>
</template>

<!--
	Options you can set from a parent or on the toaster itself:
	--dui-toast-width, --dui-toast-radius, --dui-toast-bg, --dui-toast-fg
-->

<style scoped>
.toaster {
	position: fixed;
	inset: auto var(--dui-space-4) var(--dui-space-4) auto;
	display: flex;
	flex-direction: column;
	gap: var(--dui-space-2);
	z-index: var(--dui-z-toast);
	width: min(var(--dui-toast-width, 22rem), calc(100% - var(--dui-space-8)));
}

.toast {
	position: relative;
	display: flex;
	align-items: center;
	gap: var(--dui-space-3);
	padding: var(--dui-space-4);
	padding-inline-end: var(--dui-space-8);
	border-radius: var(--dui-toast-radius, var(--dui-radius-lg));
	background: var(--dui-toast-bg, var(--dui-color-popover));
	color: var(--dui-toast-fg, var(--dui-color-popover-foreground));
	box-shadow:
		0 0 0 1px color-mix(in oklch, var(--dui-color-foreground) 10%, transparent),
		var(--dui-shadow-lg);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	outline: none;
	transition:
		opacity var(--dui-duration-slow) var(--dui-ease-out),
		translate var(--dui-duration-slow) var(--dui-ease-out);

	@starting-style {
		opacity: 0;
		translate: 0 var(--dui-space-2);
	}
}

.toast[data-variant='success'] {
	border-inline-start: 3px solid var(--dui-color-success);
}

.toast[data-variant='error'] {
	border-inline-start: 3px solid var(--dui-color-destructive);
}

.text {
	display: grid;
	gap: var(--dui-space-0-5);
	flex: 1;
	min-width: 0;
}

.title {
	font-weight: var(--dui-font-weight-medium);
}

.description {
	color: color-mix(in oklch, var(--dui-color-muted-foreground) 70%, var(--dui-color-foreground));
}

.action {
	flex-shrink: 0;
	height: 1.75rem;
	padding-inline: var(--dui-space-2-5);
	border: 0;
	border-radius: var(--dui-radius-md);
	background: var(--dui-color-primary);
	color: var(--dui-color-primary-foreground);
	font: inherit;
	font-size: var(--dui-text-xs);
	font-weight: var(--dui-font-weight-medium);
	cursor: pointer;
}

.close {
	position: absolute;
	top: var(--dui-space-2);
	right: var(--dui-space-2);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
	padding: 0;
	border: 0;
	border-radius: var(--dui-radius-sm);
	background: transparent;
	color: var(--dui-color-foreground);
	cursor: pointer;
	opacity: 0.6;

	&:hover {
		opacity: 1;
	}

	svg {
		width: 0.875rem;
		height: 0.875rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
	}
}

.action,
.close {
	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 var(--dui-ring-width)
			color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
		opacity: 1;
	}
}
</style>
