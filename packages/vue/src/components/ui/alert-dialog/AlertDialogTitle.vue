<script setup lang="ts">
import { AlertDialogTitle } from 'reka-ui';
</script>

<template>
	<!-- Reka gives it an id and points the dialog's aria-labelledby at it. -->
	<AlertDialogTitle as-child>
		<h2 class="title"><slot /></h2>
	</AlertDialogTitle>
</template>

<style scoped>
.title {
	margin: 0;
	font-size: var(--dui-text-base);
	line-height: 1;
	font-weight: var(--dui-font-weight-medium);
}
</style>
