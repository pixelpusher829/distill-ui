<script setup lang="ts">
// Wraps the Vue toast demo: the Svelte Toaster in the layout can't show Vue toasts.
import { Toaster } from '@distill-ui/vue';
</script>

<template>
	<slot />
	<Toaster />
</template>
