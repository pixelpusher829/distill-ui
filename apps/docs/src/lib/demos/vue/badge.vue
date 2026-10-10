<script setup lang="ts">
import { Badge } from '@distill-ui/vue';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
</script>

<template>
	<div class="row">
		<Badge v-for="variant in variants" :key="variant" :variant="variant">{{ variant }}</Badge>
		<Badge href="#badge" variant="outline">A link</Badge>
	</div>
</template>

<style scoped>
.row {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: var(--dui-space-2);
}
</style>
