<script lang="ts">
	import { Button, Card, Input, Label, Switch, Badge, Tabs } from '@distill-ui/svelte';
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>distill-ui: Svelte components styled with plain CSS</title>
	<meta
		name="description"
		content="Accessible Svelte 5 components you copy into your project and style with plain scoped CSS. No Tailwind."
	/>
</svelte:head>

<main>
	<section class="hero">
		<p class="eyebrow"><Badge variant="outline">Svelte 5 · No Tailwind</Badge></p>
		<h1>Svelte components you style with plain CSS.</h1>
		<p class="lead">
			Copy accessible components into your project. Each one is a Svelte file with a normal
			<code>&lt;style&gt;</code> block, so you change it the way you change any CSS.
		</p>
		<div class="actions">
			<Button href="/docs/installation" size="lg">Get started</Button>
			<Button href="/docs/components/button" variant="outline" size="lg">Browse components</Button>
		</div>
	</section>

	<section class="showcase" aria-label="Example components">
		<Card.Root>
			<Card.Header>
				<Card.Title>Create an account</Card.Title>
				<Card.Description>Every part of this card is a distill-ui component.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Tabs.Root value="email">
					<Tabs.List aria-label="Sign up with">
						<Tabs.Trigger value="email">Email</Tabs.Trigger>
						<Tabs.Trigger value="phone">Phone</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="email">
						<div class="field">
							<Label for="hero-email">Email</Label>
							<Input id="hero-email" type="email" placeholder="you@example.com" />
						</div>
					</Tabs.Content>
					<Tabs.Content value="phone">
						<div class="field">
							<Label for="hero-phone">Phone</Label>
							<Input id="hero-phone" type="tel" placeholder="+1 555 0100" />
						</div>
					</Tabs.Content>
				</Tabs.Root>
				<Label class="toggle"><Switch checked /> Send me product updates</Label>
			</Card.Content>
			<Card.Footer>
				<Button>Sign up</Button>
				<Button variant="ghost">Cancel</Button>
			</Card.Footer>
		</Card.Root>
	</section>

	<section class="problem">
		<h2>Scoped styles that actually reach the element</h2>
		<p>
			Headless Svelte libraries render their parts inside their own components, so your scoped CSS
			can't see them. distill-ui writes every element in the component's own file, so a plain
			selector does the job.
		</p>
		<div class="compare">
			<CodeBlock code={data.code.before} />
			<div>
				<CodeBlock code={data.code.after} />
				<CodeBlock code={data.code.parent} />
			</div>
		</div>
	</section>

	<section class="features">
		<div>
			<h3>You own the code</h3>
			<p>
				Components are copied into your project. Read them, change them, delete what you don't use.
			</p>
		</div>
		<div>
			<h3>Plain CSS</h3>
			<p>
				Tokens for colors, spacing and motion, and options like <code>--dui-button-bg</code> you can set
				from any parent.
			</p>
		</div>
		<div>
			<h3>Accessible</h3>
			<p>
				Native elements where they work, and Melt UI for dialogs, menus and selects. Tested with axe
				in light and dark.
			</p>
		</div>
	</section>

	<section class="start">
		<h2>Start in two commands</h2>
		<CodeBlock code={data.code.start} />
		<p>
			<a href="/docs/installation">Read the installation guide</a> or
			<a href="/docs/installation#manual">copy the files by hand</a>.
		</p>
	</section>

	<footer>
		<p>
			MIT licensed. Built on <a href="https://melt-ui.com">Melt UI</a>, with component structure
			from
			<a href="https://shadcn-svelte.com">shadcn-svelte</a>.
		</p>
	</footer>
</main>

<style>
	main {
		max-width: 64rem;
		margin: 0 auto;
		padding: 0 var(--dui-space-6);
	}

	section {
		padding-block: var(--dui-space-12);
	}

	.hero {
		max-width: 42rem;
		padding-top: 5rem;
		text-align: center;
		margin-inline: auto;
	}

	.eyebrow {
		margin: 0 0 var(--dui-space-4);
	}

	h1 {
		margin: 0;
		font-size: clamp(2.25rem, 6vw, 3.5rem);
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.lead {
		margin: var(--dui-space-5) 0 0;
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-lg);
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--dui-space-3);
		margin-top: var(--dui-space-8);
	}

	.showcase {
		display: grid;
		justify-items: center;
		padding-top: 0;

		& > :global(*) {
			width: min(100%, 26rem);
		}
	}

	.field {
		display: grid;
		gap: var(--dui-space-2);
	}

	.showcase :global(.toggle) {
		margin-top: var(--dui-space-4);
	}

	h2 {
		margin: 0 0 var(--dui-space-3);
		font-size: 1.75rem;
		letter-spacing: -0.02em;
	}

	.problem > p {
		max-width: 42rem;
		margin: 0 0 var(--dui-space-6);
		color: var(--dui-color-muted-foreground);
		line-height: 1.6;
	}

	.compare {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: var(--dui-space-4);
		align-items: start;

		& :global(.code) {
			margin-top: 0;
		}
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
		gap: var(--dui-space-8);
		border-top: 1px solid var(--dui-color-border);

		& h3 {
			margin: 0 0 var(--dui-space-2);
			font-size: var(--dui-text-base);
		}

		& p {
			margin: 0;
			color: var(--dui-color-muted-foreground);
			font-size: var(--dui-text-sm);
			line-height: 1.6;
		}
	}

	.start {
		max-width: 36rem;
		margin-inline: auto;
		text-align: center;

		& :global(.code) {
			text-align: start;
		}

		& p {
			color: var(--dui-color-muted-foreground);
		}
	}

	code {
		font-family: var(--dui-font-mono);
		font-size: 0.875em;
	}

	footer {
		padding-block: var(--dui-space-8);
		border-top: 1px solid var(--dui-color-border);
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
		text-align: center;
	}
</style>
