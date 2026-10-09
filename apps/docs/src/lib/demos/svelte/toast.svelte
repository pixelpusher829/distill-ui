<script lang="ts">
	import { Button, toast } from '@distill-ui/svelte';

	// Place <Toaster /> once in your root layout, then call toast() from anywhere.
	function showToast() {
		toast('Event has been created', {
			description: 'Sunday, December 3 at 9:00 AM',
			action: { label: 'Undo', onClick: () => toast('Undone') }
		});
	}
</script>

<div class="row">
	<Button variant="outline" onclick={showToast}>Show toast</Button>
	<Button variant="outline" onclick={() => toast.success('Profile saved')}>Success</Button>
	<Button variant="outline" onclick={() => toast.error('Something went wrong')}>Error</Button>
</div>

<style>
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--dui-space-2);
	}
</style>
