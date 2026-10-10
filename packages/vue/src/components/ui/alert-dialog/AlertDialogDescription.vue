<script setup lang="ts">
import { AlertDialogDescription } from 'reka-ui';
</script>

<template>
	<!-- Reka gives it an id and points the dialog's aria-describedby at it. -->
	<AlertDialogDescription as-child>
		<p class="description"><slot /></p>
	</AlertDialogDescription>
</template>

<style scoped>
.description {
	margin: 0;
	color: var(--dui-color-muted-foreground);
	font-size: var(--dui-text-sm);
	line-height: var(--dui-text-sm-line-height);
}
</style>
