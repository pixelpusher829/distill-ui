<script setup lang="ts">
import { TabsList } from 'reka-ui';
import { toRef } from 'vue';
import { provideTabsList, type TabsListVariant } from './context.js';

const props = withDefaults(defineProps<{ variant?: TabsListVariant; loop?: boolean }>(), {
	variant: 'default',
	loop: true
});
provideTabsList(toRef(() => props.variant));
</script>

<template>
	<TabsList :loop="loop" as-child>
		<div class="list" :data-variant="variant">
			<slot />
		</div>
	</TabsList>
</template>

<!--
	Options you can set from a parent or on the tabs list itself:
	--dui-tabs-list-height, --dui-tabs-list-radius, --dui-tabs-list-bg
-->

<style scoped>
.list {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	height: var(--dui-tabs-list-height, 2.25rem);
	padding: 3px;
	border-radius: var(--dui-tabs-list-radius, var(--dui-radius-lg));
	background: var(--dui-tabs-list-bg, var(--dui-color-muted));
	color: var(--dui-color-muted-foreground);

	&[data-variant='line'] {
		gap: var(--dui-space-1);
		border-radius: 0;
		background: var(--dui-tabs-list-bg, transparent);
	}

	&[data-orientation='vertical'] {
		flex-direction: column;
		height: fit-content;
	}
}
</style>
