<script lang="ts">
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const groups = [
		[
			'Colors',
			'--dui-color-background, --dui-color-primary, --dui-color-muted-foreground…',
			'themes/light.css and themes/dark.css'
		],
		['Corners', '--dui-radius (scales --dui-radius-sm to -xl)', 'tokens.css'],
		['Spacing', '--dui-space-1 (0.25rem) to --dui-space-12 (3rem)', 'tokens.css'],
		['Text', '--dui-font-sans, --dui-font-mono, --dui-text-xs to -lg', 'tokens.css'],
		['Shadows', '--dui-shadow-xs to -lg', 'tokens.css'],
		['Motion', '--dui-duration-fast|normal|slow, --dui-ease-*', 'motion.css']
	];
</script>

<svelte:head>
	<title>Theming · distill-ui</title>
</svelte:head>

<article class="prose">
	<h1>Theming</h1>
	<p class="lead">
		Every color, corner, space and animation comes from a token. Change a token and every component
		follows.
	</p>

	<h2>The tokens</h2>
	<p>
		Tokens are CSS custom properties that start with <code>--dui-</code>. After
		<a href="/docs/installation">installing</a>, they live in your own project, in
		<code>src/lib/styles/distill-ui</code>.
	</p>
	<table>
		<thead>
			<tr><th scope="col">Group</th><th scope="col">Examples</th><th scope="col">File</th></tr>
		</thead>
		<tbody>
			{#each groups as [group, examples, file] (group)}
				<tr><td>{group}</td><td><code>{examples}</code></td><td><code>{file}</code></td></tr>
			{/each}
		</tbody>
	</table>
	<p>
		The color names follow shadcn/ui: <code>background</code> and <code>foreground</code> for the
		page,
		<code>primary</code> for the main action, <code>muted</code> for quiet surfaces and text,
		<code>destructive</code> for danger, and so on.
	</p>

	<h2>Dark mode</h2>
	<p>
		Out of the box, the theme follows the visitor's system setting. To choose for them, set
		<code>data-theme</code> (or <code>class="dark"</code> / <code>class="light"</code>) on the
		<code>&lt;html&gt;</code> element:
	</p>
	<CodeBlock code={data.code.html} />
	<p>
		Components never check the theme themselves. They only read tokens, so a theme is just a
		different set of values.
	</p>

	<h2>Make it yours</h2>
	<p>
		The token files are yours to edit, the same as the components. To change the brand color, change
		it in both theme files, or let the <a href="/docs/theme-builder">theme builder</a> write them for
		you:
	</p>
	<CodeBlock code={data.code.edit} />
	<p>Corners and fonts are in <code>tokens.css</code>:</p>
	<CodeBlock code={data.code.radius} />

	<h3>Adding another theme</h3>
	<p>
		A theme is one selector with every color in it. Copy the colors from <code>dark.css</code> into
		a new file, change them, import the file after <code>tokens.css</code>, and set
		<code>data-theme="ocean"</code>:
	</p>
	<CodeBlock code={data.code.extra} />

	<h2>Reduced motion</h2>
	<p>
		When someone's system asks for reduced motion, every duration token becomes <code>0ms</code>, so
		dialogs and menus appear without animating. You don't need to do anything for this.
	</p>

	<p><a href="/docs/theme-builder">Next: Theme builder →</a></p>
</article>
