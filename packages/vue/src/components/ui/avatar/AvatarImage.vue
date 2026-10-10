<script setup lang="ts">
import { AvatarImage } from 'reka-ui';

// Reka only shows the image once it has loaded.
const { src, alt } = defineProps<{ src: string; alt: string }>();
</script>

<template>
	<AvatarImage :src="src" as-child>
		<img class="image" :src="src" :alt="alt" />
	</AvatarImage>
</template>

<style scoped>
.image {
	width: 100%;
	height: 100%;
	aspect-ratio: 1;
	border-radius: inherit;
	object-fit: cover;
}
</style>
