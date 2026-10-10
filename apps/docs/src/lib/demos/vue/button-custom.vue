<script setup lang="ts">
import { Button } from '@distill-ui/vue';
</script>

<template>
	<div
		style="
			--dui-button-bg: oklch(0.55 0.2 260);
			--dui-button-fg: white;
			--dui-button-radius: 9999px;
		"
	>
		<Button>Overridden from a parent</Button>
	</div>
</template>
