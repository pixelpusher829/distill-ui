<script lang="ts">
	import type { Component } from 'svelte';
	import { Badge, Tabs } from '@distill-ui/svelte';
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const demoComponents = import.meta.glob<Component>('/src/lib/demos/svelte/*.svelte', {
		import: 'default',
		eager: true
	});
	const demo = (file: string) => demoComponents[`/src/lib/demos/svelte/${file}.svelte`];
</script>

<svelte:head>
	<title>{data.doc.name} · distill-ui</title>
	<meta name="description" content={data.doc.description} />
</svelte:head>

<article class="prose">
	<h1>{data.doc.name}</h1>
	<p class="lead">{data.doc.description.replace(/`/g, '')}</p>
	<p class="built-on"><Badge variant="secondary">{data.doc.builtOn}</Badge></p>

	{#each data.demos as example, i (example.file)}
		{#if example.title}
			<h2>{example.title}</h2>
		{/if}
		{@const Demo = demo(example.file)}
		<Tabs.Root value="preview">
			<Tabs.List variant="line" aria-label="{example.title ?? data.doc.name} example">
				<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
				<Tabs.Trigger value="code">Code</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="preview">
				<div class="preview" data-testid={i === 0 ? 'preview' : undefined}>
					<div class="preview-inner"><Demo /></div>
				</div>
			</Tabs.Content>
			<Tabs.Content value="code">
				<CodeBlock code={example.code} />
			</Tabs.Content>
		</Tabs.Root>
	{/each}

	<h2>Installation</h2>
	<Tabs.Root value="cli">
		<Tabs.List variant="line" aria-label="Installation method">
			<Tabs.Trigger value="cli">CLI</Tabs.Trigger>
			<Tabs.Trigger value="manual">Manual</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="cli">
			<CodeBlock code={data.install} />
			{#each data.uses as use (use.slug)}
				<p>
					It also copies <a href="/docs/components/{use.slug}">{use.name}</a>, which {data.doc.name}
					uses.
				</p>
			{/each}
			{#if data.packages}
				<p>
					It installs <code>melt</code> and <code>@floating-ui/dom</code> if you don't have them yet.
				</p>
			{/if}
		</Tabs.Content>
		<Tabs.Content value="manual">
			<ol>
				<li>
					Set up the tokens once, if you haven't: see <a href="/docs/installation#manual"
						>manual installation</a
					>.
				</li>
				{#if data.packages}
					<li>Install the packages it needs: <CodeBlock code={data.packages} /></li>
				{/if}
				{#each data.uses as use (use.slug)}
					<li>Copy <a href="/docs/components/{use.slug}">{use.name}</a> too, which it uses.</li>
				{/each}
				<li>Copy these files into your project:</li>
			</ol>
			{#each data.files as file (file.title)}
				<CodeBlock code={file} />
			{/each}
		</Tabs.Content>
	</Tabs.Root>

	{#if data.options.length}
		<h2>Customizing</h2>
		<p>
			Set any of these on the component or on a parent element. See <a href="/docs/customizing"
				>Customizing</a
			> for how they work.
		</p>
		<table>
			<thead>
				<tr><th scope="col">Custom property</th><th scope="col">Default</th></tr>
			</thead>
			<tbody>
				{#each data.options as option (option.name)}
					<tr><td><code>{option.name}</code></td><td><code>{option.default}</code></td></tr>
				{/each}
			</tbody>
		</table>
	{/if}

	<nav class="pager" aria-label="Components">
		{#if data.previous}
			<a href="/docs/components/{data.previous.slug}">← {data.previous.name}</a>
		{/if}
		{#if data.next}
			<a class="next" href="/docs/components/{data.next.slug}">{data.next.name} →</a>
		{/if}
	</nav>
</article>

<style>
	article {
		max-width: 50rem;
	}

	.built-on {
		margin: calc(var(--dui-space-6) * -1) 0 var(--dui-space-6);
	}

	.preview {
		display: grid;
		place-items: center;
		min-height: 14rem;
		margin-top: var(--dui-space-4);
		padding: var(--dui-space-10) var(--dui-space-6);
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-lg);
		line-height: normal;
	}

	/* Each demo's top-level blocks are centered and keep their own width. */
	.preview-inner {
		display: grid;
		justify-items: center;
		width: 100%;
		max-width: 36rem;
	}

	ol li :global(.code) {
		margin-block: var(--dui-space-2);
	}

	.pager {
		display: flex;
		margin-top: var(--dui-space-12);
		font-size: var(--dui-text-sm);

		& .next {
			margin-inline-start: auto;
		}
	}
</style>
