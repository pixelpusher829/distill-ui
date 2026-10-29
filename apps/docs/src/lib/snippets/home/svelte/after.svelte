<!-- In your app -->
<Button>Save</Button>

<!-- In button.svelte, which lives in your project -->
<button class="button">
	{@render children?.()}
</button>

<style>
	/* Change the scoped style here. It just works. */
	.button {
		border-radius: 9999px;
	}
</style>
