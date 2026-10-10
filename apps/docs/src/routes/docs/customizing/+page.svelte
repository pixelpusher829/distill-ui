<script lang="ts">
	import Meta from '#lib/docs/Meta.svelte';
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Meta
	title="Customizing · distill-ui"
	description="Change one distill-ui component, or one place it's used, with plain scoped CSS and component options. No :global() or :deep()."
/>

<article class="prose">
	<h1>Customizing</h1>
	<p class="lead">
		Change one component, or one place where it's used, without touching the tokens.
	</p>

	<h2>Set an option from a parent</h2>
	<p>
		Each component has options: custom properties named after it, like <code>--dui-button-bg</code>
		or
		<code>--dui-input-radius</code>. Custom properties pass down to child elements, so you can set
		them on any parent, in your own scoped styles. No <code>:global()</code> needed:
	</p>
	<CodeBlock code={data.code.parent} />
	<p>Or on the component itself:</p>
	<CodeBlock code={data.code.inline} />
	<p>
		Every component page lists its options and their defaults under <strong>Customizing</strong>.
		The same list is in a comment above each component's <code>&lt;style&gt;</code> block.
	</p>
	<p>
		The rule of thumb: a variable starting with <code>--dui-</code> is meant to be set. Anything else
		inside a component is internal.
	</p>

	<h2>How the options work</h2>
	<p>
		Inside the component, every property reads its option first and falls back to a token. The
		second value in <code>var()</code> is the fallback, used when the option isn't set:
	</p>
	<CodeBlock code={data.code.source} />
	<p>
		So if you never set <code>--dui-button-bg</code>, a secondary button uses
		<code>--dui-color-secondary</code>. If you set it, your value wins on every variant.
	</p>

	<h2>Edit the file</h2>
	<p>
		The component files are yours. For anything the options don't cover, open the file and change
		the CSS. To add a variant, add <code>'brand'</code> to the <code>ButtonVariant</code> type at
		the top of the file, add a rule for it, and pass <code>variant="brand"</code>:
	</p>
	<CodeBlock code={data.code.variant} />
	<p>
		The CLI never overwrites a file you've changed, so your edits are safe when you add more
		components.
	</p>

	<p><a href="/docs/styling-from-scratch">Next: Styling from scratch →</a></p>
</article>
