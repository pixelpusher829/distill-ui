<script setup lang="ts">
import { SelectLabel } from 'reka-ui';
</script>

<!-- Reka calls this SelectLabel; it names the group it sits in. -->
<template>
	<SelectLabel as-child>
		<div class="heading"><slot /></div>
	</SelectLabel>
</template>

<style scoped>
.heading {
	padding: var(--dui-space-1-5) var(--dui-space-2);
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-xs);
	line-height: var(--dui-text-xs-line-height);
}
</style>
