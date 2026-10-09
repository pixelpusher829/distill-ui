<script lang="ts">
	import { Badge, Button, Card, Input, Label, Switch, Tabs } from '@distill-ui/svelte';

	let hue = $state(225);
	let radius = $state(0.625);
	let chroma = $state(0.12);

	const presets = [
		{ name: 'Cyan', hue: 225, radius: 0.625, chroma: 0.12 },
		{ name: 'Violet', hue: 285, radius: 1, chroma: 0.2 },
		{ name: 'Forest', hue: 150, radius: 0.25, chroma: 0.15 },
		{ name: 'Ember', hue: 35, radius: 0, chroma: 0.19 },
		{ name: 'Mono', hue: 0, radius: 0.375, chroma: 0 }
	];

	const primary = $derived(`oklch(0.55 ${chroma} ${hue})`);
	const css = $derived(
		`:root {\n\t--dui-color-primary: ${primary};\n\t--dui-color-primary-foreground: white;\n\t--dui-color-ring: ${primary};\n\t--dui-radius: ${radius}rem;\n}`
	);
</script>

<div class="playground">
	<div class="controls">
		<div class="presets" role="group" aria-label="Presets">
			{#each presets as preset (preset.name)}
				<button
					type="button"
					class="swatch"
					aria-pressed={hue === preset.hue && radius === preset.radius && chroma === preset.chroma}
					style="--swatch: oklch(0.55 {preset.chroma} {preset.hue})"
					onclick={() => ({ hue, radius, chroma } = preset)}
				>
					<span aria-hidden="true"></span>{preset.name}
				</button>
			{/each}
		</div>
		<label class="slider">
			<span>Hue <output>{hue}</output></span>
			<input type="range" min="0" max="360" bind:value={hue} />
		</label>
		<label class="slider">
			<span>Radius <output>{radius}rem</output></span>
			<input type="range" min="0" max="1.25" step="0.125" bind:value={radius} />
		</label>
		<pre class="css" aria-label="The CSS for this theme"><code>{css}</code></pre>
	</div>

	<!-- Everything below reads the same tokens, so changing three of them restyles it all. -->
	<div
		class="stage"
		style="--dui-color-primary: {primary}; --dui-color-ring: {primary}; --dui-radius: {radius}rem"
	>
		<Card.Root>
			<Card.Header>
				<Card.Title>Create an account</Card.Title>
				<Card.Description>Every part of this card is a distill-ui component.</Card.Description>
				<Card.Action><Badge>New</Badge></Card.Action>
			</Card.Header>
			<Card.Content>
				<Tabs.Root value="email">
					<Tabs.List aria-label="Sign up with">
						<Tabs.Trigger value="email">Email</Tabs.Trigger>
						<Tabs.Trigger value="phone">Phone</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="email">
						<div class="field">
							<Label for="play-email">Email</Label>
							<Input id="play-email" type="email" placeholder="you@example.com" />
						</div>
					</Tabs.Content>
					<Tabs.Content value="phone">
						<div class="field">
							<Label for="play-phone">Phone</Label>
							<Input id="play-phone" type="tel" placeholder="+1 555 0100" />
						</div>
					</Tabs.Content>
				</Tabs.Root>
				<div class="toggle"><Label><Switch checked /> Send me product updates</Label></div>
			</Card.Content>
			<Card.Footer>
				<Button>Sign up</Button>
				<Button variant="outline">Cancel</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

<style>
	.playground {
		display: grid;
		grid-template-columns: minmax(0, 23rem) minmax(0, 1fr);
		gap: var(--dui-space-8);
		align-items: center;
	}

	.controls {
		display: grid;
		gap: var(--dui-space-5);
	}

	.presets {
		display: flex;
		flex-wrap: wrap;
		gap: var(--dui-space-2);
	}

	.swatch {
		display: inline-flex;
		align-items: center;
		gap: var(--dui-space-1-5);
		padding: var(--dui-space-1) var(--dui-space-2-5) var(--dui-space-1) var(--dui-space-1);
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-full);
		background: var(--dui-color-background);
		color: var(--dui-color-foreground);
		font: inherit;
		font-size: var(--dui-text-xs);
		cursor: pointer;

		& span {
			width: 1.125rem;
			height: 1.125rem;
			border-radius: var(--dui-radius-full);
			background: var(--swatch);
		}

		&[aria-pressed='true'] {
			border-color: var(--dui-color-foreground);
		}

		&:focus-visible {
			outline: 2px solid var(--dui-color-ring);
			outline-offset: 2px;
		}
	}

	.slider {
		display: grid;
		gap: var(--dui-space-2);
		font-size: var(--dui-text-sm);
		font-weight: var(--dui-font-weight-medium);

		& span {
			display: flex;
			justify-content: space-between;
		}

		& output {
			color: var(--dui-color-muted-foreground);
			font-family: var(--dui-font-mono);
			font-size: var(--dui-text-xs);
		}

		& input {
			width: 100%;
			accent-color: var(--site-accent);
		}
	}

	.css {
		margin: 0;
		padding: var(--dui-space-3) var(--dui-space-4);
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-lg);
		background: var(--dui-color-muted);
		font-family: var(--dui-font-mono);
		font-size: var(--dui-text-xs);
		line-height: 1.7;
		white-space: pre-wrap;
		overflow-x: auto;
		tab-size: 2;
	}

	/* The radius scale and hover colors are worked out from these tokens in tokens.css, on :root.
	   Setting the tokens lower down means working them out again here. */
	.stage {
		--dui-radius-sm: calc(var(--dui-radius) * 0.6);
		--dui-radius-md: calc(var(--dui-radius) * 0.8);
		--dui-radius-lg: var(--dui-radius);
		--dui-radius-xl: calc(var(--dui-radius) * 1.4);
		--dui-color-primary-hover: color-mix(in oklch, var(--dui-color-primary) 80%, transparent);
		--dui-color-primary-foreground: white;

		display: grid;
		justify-items: center;
	}

	.stage > :global(*) {
		width: min(100%, 26rem);
	}

	.field {
		display: grid;
		gap: var(--dui-space-2);
	}

	.toggle {
		margin-top: var(--dui-space-4);
	}

	@media (max-width: 48rem) {
		.playground {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
