<script setup lang="ts">
import { AvatarFallback } from 'reka-ui';

// Shown until the image loads, and for good if it fails.
const { delayMs } = defineProps<{ delayMs?: number }>();
</script>

<template>
	<AvatarFallback :delay-ms="delayMs" as-child>
		<span class="fallback"><slot /></span>
	</AvatarFallback>
</template>

<!--
	Options you can set from a parent or on the avatar fallback itself:
	--dui-avatar-fallback-bg
-->

<style scoped>
.fallback {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	border-radius: inherit;
	background: var(--dui-avatar-fallback-bg, var(--dui-color-muted));
	/* Pulled toward the foreground so initials pass AA contrast on the muted fill. */
	color: var(
		--dui-avatar-fallback-fg,
		color-mix(in oklch, var(--dui-color-muted-foreground) 70%, var(--dui-color-foreground))
	);
}
</style>
