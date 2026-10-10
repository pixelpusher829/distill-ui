<script lang="ts">
	import Meta from '#lib/docs/Meta.svelte';
	import {
		Alert,
		Badge,
		Button,
		Card,
		Checkbox,
		Input,
		Label,
		RadioGroup,
		Switch,
		Tabs
	} from '@distill-ui/svelte';
	import CopyButton from '#lib/docs/CopyButton.svelte';
	import {
		applyColors,
		defaults,
		grays,
		themeColors,
		toStyle,
		type ThemeSettings
	} from '#lib/docs/theme.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let settings: ThemeSettings = $state({ ...defaults });

	const presets: { name: string; hue: number; chroma: number }[] = [
		{ name: 'Default', hue: 225, chroma: 0 },
		{ name: 'Cyan', hue: 225, chroma: 0.12 },
		{ name: 'Violet', hue: 285, chroma: 0.2 },
		{ name: 'Forest', hue: 150, chroma: 0.15 },
		{ name: 'Ember', hue: 35, chroma: 0.19 }
	];

	const light = $derived(themeColors(settings, 'light'));
	const dark = $derived(themeColors(settings, 'dark'));

	const files = $derived([
		{ name: 'themes/light.css', code: applyColors(data.files.light, light) },
		{ name: 'themes/dark.css', code: applyColors(data.files.dark, dark) },
		{
			name: 'tokens.css',
			code: `/* In tokens.css, change this one line. */\n--dui-radius: ${settings.radius}rem;`
		}
	]);
</script>

<Meta
	title="Theme builder · distill-ui"
	description="Pick a color, a gray and a corner radius, preview them on real components in light and dark, then copy the theme into your project."
/>

<article class="prose">
	<h1>Theme builder</h1>
	<p class="lead">
		Pick a color, a gray and a corner radius, check them in light and dark, then copy the theme
		files into your project.
	</p>
</article>

<div class="builder">
	<section class="controls" aria-label="Theme settings">
		<fieldset>
			<legend>Primary color</legend>
			<div class="presets">
				{#each presets as preset (preset.name)}
					<button
						type="button"
						class="swatch"
						aria-pressed={settings.hue === preset.hue && settings.chroma === preset.chroma}
						style="--swatch: oklch({preset.chroma ? 0.55 : 0.205} {preset.chroma} {preset.hue})"
						onclick={() => {
							settings.hue = preset.hue;
							settings.chroma = preset.chroma;
						}}
					>
						<span aria-hidden="true"></span>{preset.name}
					</button>
				{/each}
			</div>
			<label class="slider">
				<span>Hue <output>{settings.hue}</output></span>
				<input type="range" min="0" max="360" bind:value={settings.hue} />
			</label>
			<label class="slider">
				<span>Colorfulness <output>{settings.chroma}</output></span>
				<input type="range" min="0" max="0.2" step="0.01" bind:value={settings.chroma} />
			</label>
		</fieldset>

		<fieldset>
			<legend>Grays</legend>
			<RadioGroup.Root bind:value={settings.gray} aria-label="Grays">
				{#each Object.entries(grays) as [value, gray] (value)}
					<Label><RadioGroup.Item {value} /> {gray.label}</Label>
				{/each}
			</RadioGroup.Root>
		</fieldset>

		<fieldset>
			<legend>Corners</legend>
			<label class="slider">
				<span>Radius <output>{settings.radius}rem</output></span>
				<input type="range" min="0" max="1.25" step="0.125" bind:value={settings.radius} />
			</label>
		</fieldset>

		<Button variant="outline" onclick={() => (settings = { ...defaults })}>Reset</Button>
	</section>

	<div class="previews">
		{@render preview('light', light)}
		{@render preview('dark', dark)}
	</div>
</div>

<!-- Each preview sets its theme with data-theme, then the builder's colors on top. -->
{#snippet preview(mode: 'light' | 'dark', colors: Record<string, string>)}
	<section
		class="preview"
		data-theme={mode}
		style="{toStyle(colors)}; --dui-radius: {settings.radius}rem"
		aria-label="{mode === 'light' ? 'Light' : 'Dark'} preview"
	>
		<Card.Root>
			<Card.Header>
				<Card.Title>Notifications</Card.Title>
				<Card.Description>Choose what you hear about.</Card.Description>
				<Card.Action><Badge>Pro</Badge></Card.Action>
			</Card.Header>
			<Card.Content>
				<Tabs.Root value="email">
					<Tabs.List aria-label="Send to">
						<Tabs.Trigger value="email">Email</Tabs.Trigger>
						<Tabs.Trigger value="phone">Phone</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="email">
						<div class="field">
							<Label for="{mode}-email">Email</Label>
							<Input id="{mode}-email" type="email" placeholder="you@example.com" />
						</div>
					</Tabs.Content>
					<Tabs.Content value="phone">
						<div class="field">
							<Label for="{mode}-phone">Phone</Label>
							<Input id="{mode}-phone" type="tel" placeholder="+1 555 0100" />
						</div>
					</Tabs.Content>
				</Tabs.Root>
				<div class="checks">
					<Label><Switch checked /> Product updates</Label>
					<Label><Checkbox checked /> Weekly summary</Label>
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save</Button>
				<Button variant="secondary">Preview</Button>
				<Button variant="outline">Cancel</Button>
			</Card.Footer>
		</Card.Root>
		<Alert.Root variant="destructive">
			<Alert.Title>Your card was declined.</Alert.Title>
			<Alert.Description>Update your billing details to keep your plan.</Alert.Description>
		</Alert.Root>
	</section>
{/snippet}

<article class="prose">
	<h2>Copy your theme</h2>
	<p>
		Replace the files in <code>src/lib/styles/distill-ui</code> with these. They're the files you already
		have, with only the colors changed.
	</p>
</article>

{#each files as file (file.name)}
	<figure class="file">
		<figcaption>
			<code>{file.name}</code>
			<CopyButton text={file.code} label="Copy {file.name}" />
		</figcaption>
		<!-- Focusable so keyboard users can scroll it, like the Shiki code blocks. -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<pre tabindex="0"><code>{file.code}</code></pre>
	</figure>
{/each}

<p class="next"><a href="/docs/customizing">Next: Customizing →</a></p>

<style>
	.builder {
		display: grid;
		grid-template-columns: 15rem minmax(0, 1fr);
		gap: var(--dui-space-8);
		align-items: start;
		margin-block: var(--dui-space-8) var(--dui-space-12);
	}

	.controls {
		display: grid;
		gap: var(--dui-space-6);
		position: sticky;
		top: 5rem;
	}

	fieldset {
		display: grid;
		gap: var(--dui-space-4);
		margin: 0;
		padding: 0;
		border: 0;
	}

	legend {
		margin-bottom: var(--dui-space-3);
		padding: 0;
		font-size: var(--dui-text-sm);
		font-weight: var(--dui-font-weight-semibold);
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

	.previews {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: var(--dui-space-4);
	}

	/* The radius scale and hover colors are worked out from the tokens on :root and on
	   [data-theme] in tokens.css. The radius scale is only on :root, so it's redone here. */
	.preview {
		--dui-radius-sm: calc(var(--dui-radius) * 0.6);
		--dui-radius-md: calc(var(--dui-radius) * 0.8);
		--dui-radius-lg: var(--dui-radius);
		--dui-radius-xl: calc(var(--dui-radius) * 1.4);

		display: grid;
		gap: var(--dui-space-4);
		align-content: start;
		padding: var(--dui-space-5);
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-xl);
		background: var(--dui-color-background);
		color: var(--dui-color-foreground);
	}

	.field {
		display: grid;
		gap: var(--dui-space-2);
	}

	.checks {
		display: grid;
		gap: var(--dui-space-3);
		margin-top: var(--dui-space-4);
	}

	.file {
		margin: var(--dui-space-4) 0;
		overflow: hidden;
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-lg);

		& figcaption {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: var(--dui-space-1) var(--dui-space-1) var(--dui-space-1) var(--dui-space-4);
			border-bottom: 1px solid var(--dui-color-border);
			font-size: var(--dui-text-xs);
		}

		& pre {
			max-height: 24rem;
			margin: 0;
			padding: var(--dui-space-4);
			overflow: auto;
			background: var(--dui-color-muted);
			font-family: var(--dui-font-mono);
			font-size: var(--dui-text-xs);
			line-height: 1.6;
			tab-size: 2;
		}
	}

	.next {
		margin-top: var(--dui-space-8);
	}

	@media (max-width: 60rem) {
		.builder {
			grid-template-columns: minmax(0, 1fr);
		}

		.controls {
			position: static;
		}
	}
</style>
