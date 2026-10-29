<!-- In your app -->
<Button>Save</Button>

<!-- In Button.vue, which lives in your project -->
<template>
	<button class="button">
		<slot />
	</button>
</template>

<style scoped>
/* Change the scoped style here. It just works. */
.button {
	border-radius: 9999px;
}
</style>
