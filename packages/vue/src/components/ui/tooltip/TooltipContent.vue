<script setup lang="ts">
import { TooltipArrow, TooltipContent } from 'reka-ui';
import { computed } from 'vue';
import { injectTooltipPlacement } from './context.js';
import { toSideAlign } from './placement.js';

defineOptions({ inheritAttrs: false });

const position = computed(() => toSideAlign(injectTooltipPlacement().value));
</script>

<template>
	<!-- No portal: Reka positions it with position: fixed, so it stays inside your styles. -->
	<TooltipContent :side="position.side" :align="position.align" :side-offset="4" as-child>
		<div v-bind="$attrs" class="content">
			<slot />
			<TooltipArrow :width="8" :height="4" as-child>
				<span class="arrow"></span>
			</TooltipArrow>
		</div>
	</TooltipContent>
</template>

<!--
	Options you can set from a parent or on the tooltip content itself:
	--dui-tooltip-max-width, --dui-tooltip-radius, --dui-tooltip-bg, --dui-tooltip-fg
-->

<style scoped>
.content {
	width: fit-content;
	max-width: var(--dui-tooltip-max-width, 20rem);
	padding: var(--dui-space-1-5) var(--dui-space-3);
	border-radius: var(--dui-tooltip-radius, var(--dui-radius-md));
	background: var(--dui-tooltip-bg, var(--dui-color-primary));
	color: var(--dui-tooltip-fg, var(--dui-color-primary-foreground));
	font-size: var(--dui-text-xs);
	line-height: var(--dui-text-xs-line-height);
	text-wrap: balance;
	overflow: visible;
	/* Reka copies this onto the positioning wrapper it puts around the content. */
	z-index: var(--dui-z-popover);

	/* Reka waits for animationend before removing it, so this uses the shared keyframes. */
	&[data-state='delayed-open'],
	&[data-state='instant-open'] {
		animation: distill-zoom-in var(--dui-duration-fast) var(--dui-ease-out);
	}

	&[data-state='closed'] {
		animation: distill-zoom-out var(--dui-duration-fast) var(--dui-ease-out);
	}
}

/* Reka positions the arrow at the edge; we draw it as a square turned 45° and
   pulled halfway under the tooltip, in the tooltip's color. */
.arrow {
	display: block;
	width: 0.5rem;
	height: 0.5rem;
	border-radius: 2px;
	background: var(--dui-tooltip-bg, var(--dui-color-primary));
	translate: 0 -50%;
	rotate: 45deg;
}
</style>
