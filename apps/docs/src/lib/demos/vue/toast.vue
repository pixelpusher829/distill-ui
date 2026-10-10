<script setup lang="ts">
import { Button, toast } from '@distill-ui/vue';

// Place <Toaster /> once in App.vue, then call toast() from anywhere.
function showToast() {
	toast('Event has been created', {
		description: 'Sunday, December 3 at 9:00 AM',
		action: { label: 'Undo', onClick: () => toast('Undone') }
	});
}
</script>

<template>
	<div class="row">
		<Button variant="outline" @click="showToast">Show toast</Button>
		<Button variant="outline" @click="toast.success('Profile saved')">Success</Button>
		<Button variant="outline" @click="toast.error('Something went wrong')">Error</Button>
	</div>
</template>

<style scoped>
.row {
	display: flex;
	flex-wrap: wrap;
	gap: var(--dui-space-2);
}
</style>
