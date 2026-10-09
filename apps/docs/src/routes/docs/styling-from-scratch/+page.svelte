<script lang="ts">
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const states = [
		['Open (dialog, popover, menu, select)', '[data-open]'],
		['Active tab', '[data-active]'],
		['Highlighted option or menu item', '[data-highlighted]'],
		['Orientation', '[data-orientation="horizontal"] / "vertical"'],
		['Disabled items and tabs', '[data-disabled]'],
		['Select showing its placeholder', '[data-placeholder]'],
		['Invalid form control', '[aria-invalid="true"]'],
		['Checkbox, radio and switch', ':checked, :indeterminate, :disabled']
	];
</script>

<svelte:head>
	<title>Styling from scratch · distill-ui</title>
</svelte:head>

<article class="prose">
	<h1>Styling from scratch</h1>
	<p class="lead">
		Keep the behavior and accessibility, throw away our look, and write your own CSS.
	</p>

	<p>
		If your design is very different from ours, changing tokens one by one is slower than starting
		over. Every component is built so you can delete its <code>&lt;style&gt;</code> block and write a
		new one. The markup, keyboard support and screen reader support all stay the same.
	</p>

	<h2>What you can style</h2>
	<p>
		Every element has a class named after its part (<code>.button</code>, <code>.trigger</code>,
		<code>.content</code>, <code>.item</code>), and variants and sizes are data attributes:
	</p>
	<CodeBlock code={data.code.markup} />
	<p>Open, active and highlighted states are attributes too, set by the component as you use it:</p>
	<table>
		<thead>
			<tr><th scope="col">State</th><th scope="col">Selector</th></tr>
		</thead>
		<tbody>
			{#each states as [state, selector] (state)}
				<tr><td>{state}</td><td><code>{selector}</code></td></tr>
			{/each}
		</tbody>
	</table>

	<h2>An example</h2>
	<p>
		Delete everything inside <code>button.svelte</code>'s <code>&lt;style&gt;</code> block and write your
		own. Because the classes are in the same file, Svelte scopes them for you:
	</p>
	<CodeBlock code={data.code.style} />
	<p>
		Every place you use <code>&lt;Button&gt;</code>, including inside Dialog and the other
		components that use it, now looks like this.
	</p>

	<h2>Things to keep</h2>
	<ul>
		<li>
			<strong>A visible focus style</strong> on everything you can click or type in, using
			<code>:focus-visible</code>. Keyboard users need it to see where they are.
		</li>
		<li>
			<strong>Hidden states.</strong> Dialogs, popovers and menus are hidden until
			<code>[data-open]</code> is set. Keep the rules that show and hide them, or copy them from the original
			file.
		</li>
		<li>
			<strong>Enough contrast</strong> between text and background (4.5 to 1 for normal text).
		</li>
	</ul>
	<p>
		You can keep using the tokens in your new styles, or none of them. Once no component reads them,
		you can remove the <code>tokens.css</code> import too.
	</p>
</article>
