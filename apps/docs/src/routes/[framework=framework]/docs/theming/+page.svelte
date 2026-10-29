<script lang="ts">
	import { framework } from '#lib/docs/framework.svelte.js';
	import Meta from '#lib/components/Meta.svelte';
	import CodeBlock from '#lib/components/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const groups = [
		['Presets', '--dui-blue, --dui-violet…, --dui-gray-slate…'],
		['Seeds', '--dui-neutral, --dui-primary, --dui-destructive, --dui-success'],
		['Scales', '--dui-neutral-50 to -950, --dui-primary-50 to -950'],
		['Colors', '--dui-color-background, --dui-color-primary, --dui-color-muted-foreground…'],
		['Corners', '--dui-radius (scales --dui-radius-sm to -xl)'],
		['Spacing', '--dui-space-1 (0.25rem) to --dui-space-12 (3rem)'],
		['Text', '--dui-font-sans, --dui-font-mono, --dui-text-xs to -lg, --dui-weight-*'],
		['Shadows', '--dui-shadow-xs to -lg'],
		['Motion', '--dui-duration-fast|normal|slow, --dui-ease-*']
	];
</script>

<Meta
	title="Theming · distill-ui for {framework.name}"
	description="Every color, corner, space and animation in distill-ui's {framework.name} components comes from a CSS custom property. Change a token and they all follow."
/>

<article class="prose">
	<h1>Theming</h1>
	<p class="lead">
		Every color, corner, space and animation comes from a token. Change a token and every component
		follows.
	</p>

	<h2>The tokens</h2>
	<p>
		Tokens are CSS custom properties that start with <code>--dui-</code>. After
		<a href={framework.link('/docs/installation')}>installing</a>, they live in your own project,
		all in one file:
		<code>src/lib/styles/distill-ui/tokens.css</code>.
	</p>
	<table>
		<thead>
			<tr><th scope="col">Group</th><th scope="col">Examples</th></tr>
		</thead>
		<tbody>
			{#each groups as [group, examples] (group)}
				<tr><td>{group}</td><td><code>{examples}</code></td></tr>
			{/each}
		</tbody>
	</table>

	<h2>Colors</h2>
	<p>Colors work in three layers. You only ever change the first.</p>
	<ol>
		<li>
			<strong>Seeds:</strong> <code>--dui-neutral</code>, <code>--dui-primary</code>,
			<code>--dui-destructive</code> and <code>--dui-success</code>.
		</li>
		<li>
			<strong>Scales:</strong> neutral and primary each get steps from <code>50</code> to
			<code>950</code>. Every step has a fixed lightness, so the seed only sets the hue and how
			colorful it is, and contrast holds whatever you pick.
		</li>
		<li>
			<strong>Semantic colors:</strong> what components read, named after shadcn/ui:
			<code>background</code> and <code>foreground</code> for the page, <code>primary</code> for the
			main action, <code>muted</code> for quiet surfaces and text, <code>destructive</code> for
			danger, and so on. Each points at a light and a dark step, like
			<code>light-dark(var(--dui-primary-500), var(--dui-primary-400))</code>.
		</li>
	</ol>

	<h3>Presets</h3>
	<p>
		<code>tokens.css</code> comes with ready-made colors to point the seeds at. Switching is one word:
	</p>
	<table>
		<thead>
			<tr><th scope="col">Seed</th><th scope="col">Presets</th></tr>
		</thead>
		<tbody>
			<tr>
				<td><code>--dui-primary</code></td>
				<td>
					<code>--dui-blue</code> (default), <code>--dui-cyan</code>, <code>--dui-violet</code>,
					<code>--dui-forest</code>, <code>--dui-ember</code>
				</td>
			</tr>
			<tr>
				<td><code>--dui-neutral</code></td>
				<td>
					<code>--dui-gray-slate</code> (default), <code>--dui-gray-neutral</code>,
					<code>--dui-gray-stone</code>
				</td>
			</tr>
		</tbody>
	</table>
	<p>For a color of your own, set the seed to any <code>oklch()</code> value instead.</p>

	<h2>Dark mode</h2>
	<p>
		Out of the box, the theme follows the visitor's system setting. To choose for them, set
		<code>data-theme</code> (or <code>class="dark"</code> / <code>class="light"</code>) on the
		<code>&lt;html&gt;</code> element:
	</p>
	<CodeBlock code={data.code.html} />
	<p>
		Every color has a light and a dark value, and <code>data-theme</code> works on any element, not
		just <code>&lt;html&gt;</code>. Components never check the theme themselves.
	</p>

	<h2>Make it yours</h2>
	<p>
		<code>tokens.css</code> is yours to edit, the same as the components. To rebrand, change the
		seeds, or let the <a href={framework.link('/docs/theme-builder')}>theme builder</a> pick them for
		you:
	</p>
	<CodeBlock code={data.code.edit} />

	<h3>Theming part of a page</h3>
	<p>
		Set seeds on any element with <code>class="dui-theme"</code> and the colors are worked out again for
		everything inside it:
	</p>
	<CodeBlock code={data.code.extra} />

	<h2>Reduced motion</h2>
	<p>
		When someone's system asks for reduced motion, every duration token becomes <code>0ms</code>, so
		dialogs and menus appear without animating. You don't need to do anything for this.
	</p>

	<p><a href={framework.link('/docs/theme-builder')}>Next: Theme builder →</a></p>
</article>
