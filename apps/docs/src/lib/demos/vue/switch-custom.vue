<script setup lang="ts">
import { Label, Switch } from '@distill-ui/vue';
</script>

<template>
	<div style="--dui-switch-checked-track: oklch(0.6 0.17 150)">
		<Label><Switch :model-value="true" /> Green from a parent</Label>
	</div>
</template>
