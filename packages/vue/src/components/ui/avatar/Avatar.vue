<script setup lang="ts">
import { AvatarRoot } from 'reka-ui';

const { size = 'md' } = defineProps<{ size?: 'sm' | 'md' | 'lg' }>();
</script>

<template>
	<AvatarRoot as-child>
		<span class="avatar" :data-size="size"><slot /></span>
	</AvatarRoot>
</template>

<!--
	Options you can set from a parent or on the avatar itself:
	--dui-avatar-size, --dui-avatar-radius
-->

<style scoped>
.avatar {
	position: relative;
	display: flex;
	flex-shrink: 0;
	width: var(--dui-avatar-size, 2rem);
	height: var(--dui-avatar-size, 2rem);
	/* Set by Avatar.Group so stacked avatars overlap with a gap ring. */
	margin-inline-start: var(--avatar-overlap, 0);
	border-radius: var(--dui-avatar-radius, var(--dui-radius-full));
	box-shadow: 0 0 0 var(--avatar-ring-width, 0) var(--dui-color-background);
	font-size: var(--dui-text-sm);
	user-select: none;

	&:first-child {
		margin-inline-start: 0;
	}

	/* A faint edge so light images don't blend into the page. */
	&::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid color-mix(in oklch, var(--dui-color-foreground) 10%, transparent);
		border-radius: inherit;
		pointer-events: none;
	}
}

.avatar[data-size='sm'] {
	width: var(--dui-avatar-size, 1.5rem);
	height: var(--dui-avatar-size, 1.5rem);
	font-size: var(--dui-text-xs);
}

.avatar[data-size='lg'] {
	width: var(--dui-avatar-size, 2.5rem);
	height: var(--dui-avatar-size, 2.5rem);
}
</style>
