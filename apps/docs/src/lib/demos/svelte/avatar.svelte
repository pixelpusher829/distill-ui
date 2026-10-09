<script lang="ts">
	import { Avatar } from '@distill-ui/svelte';
</script>

<div class="row">
	<Avatar.Root>
		<Avatar.Image src="/avatar.svg" alt="Profile picture" />
		<Avatar.Fallback>JB</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root>
		<Avatar.Image src="/missing.png" alt="Missing picture" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<Avatar.Root size="sm"><Avatar.Fallback>SM</Avatar.Fallback></Avatar.Root>
	<Avatar.Root size="lg"><Avatar.Fallback>LG</Avatar.Fallback></Avatar.Root>
</div>

<style>
	.row {
		display: flex;
		align-items: center;
		gap: var(--dui-space-3);
	}
</style>
