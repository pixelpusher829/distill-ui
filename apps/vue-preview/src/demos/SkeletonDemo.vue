<script setup lang="ts">
import { Skeleton } from '@distill-ui/vue';
</script>

<template>
	<div class="row">
		<Skeleton style="width: 3rem; height: 3rem; border-radius: 9999px" />
		<div class="lines">
			<Skeleton style="width: 15rem; height: 1rem" />
			<Skeleton style="width: 12rem; height: 1rem" />
		</div>
	</div>
</template>

<style scoped>
.row {
	display: flex;
	align-items: center;
	gap: var(--dui-space-4);
}

.lines {
	display: grid;
	gap: var(--dui-space-2);
}
</style>
