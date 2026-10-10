<script setup lang="ts">
import { TabsRoot, useForwardPropsEmits, type TabsRootEmits, type TabsRootProps } from 'reka-ui';

// Takes Reka UI's TabsRoot props: v-model, default-value, orientation…
const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<TabsRoot v-bind="forwarded" as-child>
		<div class="tabs">
			<slot />
		</div>
	</TabsRoot>
</template>

<style scoped>
.tabs {
	display: flex;
	flex-direction: column;
	gap: var(--dui-space-2);

	&[data-orientation='vertical'] {
		flex-direction: row;
	}
}
</style>
