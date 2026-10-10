<script setup lang="ts">
import { Avatar } from '@distill-ui/vue';
</script>

<template>
	<Avatar.Group>
		<Avatar.Root>
			<Avatar.Image src="/avatar.svg" alt="Ada" />
			<Avatar.Fallback>AD</Avatar.Fallback>
		</Avatar.Root>
		<Avatar.Root><Avatar.Fallback>BO</Avatar.Fallback></Avatar.Root>
		<Avatar.Root><Avatar.Fallback>CY</Avatar.Fallback></Avatar.Root>
	</Avatar.Group>
</template>
