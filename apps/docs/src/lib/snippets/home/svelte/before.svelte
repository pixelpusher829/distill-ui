<!-- Workaround 1: leak the style to the
     whole app with :global(). -->
<Button class="save">Save</Button>

<style>
	:global(.save) {
		border-radius: 9999px;
	}
</style>

<!-- Workaround 2: render the button yourself
     with a child snippet, so a scoped .save rule
     reaches it. Repeat everywhere you use one. -->
<Button>
	{#snippet child({ props })}
		<button {...props} class="save">Save</button>
	{/snippet}
</Button>
