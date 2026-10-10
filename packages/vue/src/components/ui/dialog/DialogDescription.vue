<script setup lang="ts">
import { DialogDescription } from 'reka-ui';
</script>

<!-- Reka gives it an id and points the dialog's aria-describedby at it. -->
<template>
	<DialogDescription as-child>
		<p class="description"><slot /></p>
	</DialogDescription>
</template>

<style scoped>
.description {
	margin: 0;
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
}
</style>
