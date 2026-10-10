<script setup lang="ts">
import { Button, Card, Input, Label } from '@distill-ui/vue';
</script>

<template>
	<div class="cards">
		<Card.Root>
			<Card.Header>
				<Card.Title>Login to your account</Card.Title>
				<Card.Description>Enter your email below to login.</Card.Description>
				<Card.Action><Button variant="link">Sign up</Button></Card.Action>
			</Card.Header>
			<Card.Content>
				<div class="field">
					<Label for="card-email">Email</Label>
					<Input id="card-email" type="email" placeholder="you@example.com" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Login</Button>
				<Button variant="outline">Cancel</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root size="sm" style="--dui-card-radius: 0">
			<Card.Header>
				<Card.Title>Small card</Card.Title>
				<Card.Description>Tighter spacing, and square corners set from outside.</Card.Description>
			</Card.Header>
			<Card.Content>Content goes here.</Card.Content>
		</Card.Root>
	</div>
</template>

<style scoped>
.cards {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
	align-items: start;
	gap: var(--dui-space-4);
	width: min(100%, 34rem);
}

.field {
	display: grid;
	gap: var(--dui-space-2);
}
</style>
