<script lang="ts">
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import { framework } from '#lib/docs/framework.svelte.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const vue = $derived(framework.current === 'vue');
	const components = $derived(vue ? 'src/components/ui' : 'src/lib/components/ui');
	const styles = $derived(vue ? 'src/styles/distill-ui' : 'src/lib/styles/distill-ui');
</script>

<svelte:head>
	<title>Installation · distill-ui</title>
</svelte:head>

<article class="prose">
	<h1>Installation</h1>
	{#if vue}
		<p class="lead">Add distill-ui to a Vue 3 or Nuxt project. You don't need Tailwind.</p>
	{:else}
		<p class="lead">Add distill-ui to a Svelte 5 project. You don't need Tailwind.</p>
	{/if}

	<h2>With the CLI</h2>
	<h3>1. Set up the tokens</h3>
	<p>Run this in your project's folder:</p>
	<CodeBlock code={data.code.init} />
	<p>It does three things:</p>
	<ul>
		<li>copies the tokens into <code>{styles}</code>,</li>
		{#if vue}
			<li>
				imports them at the top of <code>src/main.ts</code> (in Nuxt it prints the lines to add to
				<code>nuxt.config.ts</code>),
			</li>
		{:else}
			<li>
				imports them in <code>src/routes/+layout.svelte</code> (and creates that file if needed),
			</li>
		{/if}
		<li>saves where things go in <code>distill-ui.json</code>.</li>
	</ul>
	<CodeBlock code={data.code.config} />
	<p>Change the folders in that file before adding components if you want them somewhere else.</p>
	{#if vue}
		<p>
			In Nuxt the folders start with <code>app/</code> (or with nothing, in projects without an
			<code>app</code> folder): <code>app/components/ui</code> and
			<code>app/assets/styles/distill-ui</code>.
		</p>
	{/if}

	<h3>2. Add components</h3>
	<CodeBlock code={data.code.add} />
	<p>
		This copies each component into <code>{components}</code>, along with any other component it
		uses (Dialog uses Button). It also installs
		{#if vue}<code>reka-ui</code>{:else}<code>melt</code> and <code>@floating-ui/dom</code>{/if}
		with your package manager when a component needs them. Run <code>npx distill-ui list</code> to
		see everything you can add, or <code>npx distill-ui add --all</code> to add it all.
	</p>
	<p>
		The CLI never replaces a file you've changed. Pass <code>--overwrite</code> if you want the latest
		version back.
	</p>

	<h3>3. Use them</h3>
	<CodeBlock code={data.code.use} />
	{#if vue}
		<p>
			Projects made with <code>npm create vue</code> point <code>@</code> at <code>src</code>. In
			Nuxt, import from <code>~/components/ui/button</code>.
		</p>
	{:else}
		<p>
			SvelteKit 3 projects import from <code>src/lib</code> with <code>#lib</code> and the full path
			to
			<code>index.js</code>. Older projects use <code>$lib/components/ui/button</code>.
		</p>
	{/if}

	<h2 id="manual">Manually</h2>
	<p>Everything the CLI does, you can do by copying files yourself.</p>
	<ol>
		<li>
			Copy the <code>packages/tokens</code> folder from
			<a href="https://github.com/pixelpusher829/distill-ui">the GitHub repo</a> into
			<code>{styles}</code>: <code>tokens.css</code>, <code>motion.css</code> and the
			<code>themes</code> folder.
		</li>
		<li>
			{#if vue}
				Import the tokens once, in your app's entry file:
				<CodeBlock code={data.code.entry} />
				In Nuxt, add them to <code>nuxt.config.ts</code> instead, and have Nuxt auto-import only the
				<code>.vue</code> files:
				<CodeBlock code={data.code.nuxt} />
			{:else}
				Import the tokens once, in your root layout:
				<CodeBlock code={data.code.entry} />
			{/if}
		</li>
		<li>
			Install the packages that dialogs, menus and other interactive components use:
			<CodeBlock code={data.code.packages} />
		</li>
		<li>
			Copy the files from each component's page, under Installation → Manual, into
			<code>{components}/&lt;component&gt;</code>.
		</li>
	</ol>

	<p><a href="/docs/theming">Next: Theming →</a></p>
</article>
