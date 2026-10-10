<script setup lang="ts">
import { DialogTitle } from 'reka-ui';
</script>

<template>
	<!-- Reka gives it an id and points the dialog's aria-labelledby at it. -->
	<DialogTitle as-child>
		<h2 class="title"><slot /></h2>
	</DialogTitle>
</template>

<style scoped>
.title {
	margin: 0;
	font-size: var(--dui-text-base);
	line-height: 1;
	font-weight: var(--dui-font-weight-medium);
}
</style>
