<script lang="ts">
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Installation · distill-ui</title>
</svelte:head>

<article class="prose">
	<h1>Installation</h1>
	<p class="lead">Add distill-ui to a Svelte 5 project. You don't need Tailwind.</p>

	<h2>With the CLI</h2>
	<h3>1. Set up the tokens</h3>
	<p>Run this in your project's folder:</p>
	<CodeBlock code={data.code.init} />
	<p>It does three things:</p>
	<ul>
		<li>copies the tokens into <code>src/lib/styles/distill-ui</code>,</li>
		<li>
			imports them in <code>src/routes/+layout.svelte</code> (and creates that file if needed),
		</li>
		<li>saves where things go in <code>distill-ui.json</code>.</li>
	</ul>
	<CodeBlock code={data.code.config} />
	<p>Change the folders in that file before adding components if you want them somewhere else.</p>

	<h3>2. Add components</h3>
	<CodeBlock code={data.code.add} />
	<p>
		This copies each component into <code>src/lib/components/ui</code>, along with any other
		component it uses (Dialog uses Button). It also installs <code>melt</code> and
		<code>@floating-ui/dom</code>
		with your package manager when a component needs them. Run <code>npx distill-ui list</code> to
		see everything you can add, or <code>npx distill-ui add --all</code> to add it all.
	</p>
	<p>
		The CLI never replaces a file you've changed. Pass <code>--overwrite</code> if you want the latest
		version back.
	</p>

	<h3>3. Use them</h3>
	<CodeBlock code={data.code.use} />
	<p>
		SvelteKit 3 projects import from <code>src/lib</code> with <code>#lib</code> and the full path
		to
		<code>index.js</code>. Older projects use <code>$lib/components/ui/button</code>.
	</p>

	<h2 id="manual">Manually</h2>
	<p>Everything the CLI does, you can do by copying files yourself.</p>
	<ol>
		<li>
			Copy the <code>packages/tokens</code> folder from
			<a href="https://github.com/pixelpusher829/distill-ui">the GitHub repo</a> into
			<code>src/lib/styles/distill-ui</code>: <code>tokens.css</code>, <code>motion.css</code> and
			the
			<code>themes</code> folder.
		</li>
		<li>
			Import the tokens once, in your root layout:
			<CodeBlock code={data.code.layout} />
		</li>
		<li>
			Install the packages that dialogs, menus and other interactive components use:
			<CodeBlock code={data.code.packages} />
		</li>
		<li>
			Copy the files from each component's page, under Installation → Manual, into
			<code>src/lib/components/ui/&lt;component&gt;</code>.
		</li>
	</ol>

	<p><a href="/docs/theming">Next: Theming →</a></p>
</article>
