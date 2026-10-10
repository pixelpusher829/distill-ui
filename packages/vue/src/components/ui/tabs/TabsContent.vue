<script setup lang="ts">
import { TabsContent } from 'reka-ui';

const { value } = defineProps<{ value: string }>();
</script>

<template>
	<TabsContent :value="value" as-child>
		<div class="content">
			<slot />
		</div>
	</TabsContent>
</template>

<style scoped>
.content {
	flex: 1;
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
	outline: none;

	&:focus-visible {
		border-radius: var(--dui-radius-md);
		box-shadow: 0 0 0 var(--dui-ring-width)
			color-mix(in oklch, var(--dui-color-ring) 50%, transparent);
	}
}
</style>
