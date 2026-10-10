<script lang="ts">
	import Meta from '#lib/docs/Meta.svelte';
</script>

<Meta
	title="Introduction · distill-ui"
	description="What distill-ui is: accessible Svelte 5 and Vue 3 components you copy into your project and style with plain CSS, not a package you import."
/>

<article class="prose">
	<h1>Introduction</h1>
	<p class="lead">
		Accessible Svelte 5 and Vue 3 components that you copy into your project and style with plain
		CSS.
	</p>

	<p>
		distill-ui isn't a package you install and import. Each component is a few
		<code>.svelte</code> or <code>.vue</code> files that live in your own project, so you can read
		them and change them like any other code you wrote. The styles are a normal
		<code>&lt;style&gt;</code> block in each file. There's no Tailwind, no class strings and no build
		plugin.
	</p>

	<h2>Why this exists</h2>
	<p>
		Svelte gives every component scoped CSS for free. Most Svelte component libraries don't use it:
		they're styled with Tailwind, so the look lives in long class strings inside the markup. That
		works for a lot of people. distill-ui is for the people who would rather write CSS.
	</p>
	<p>
		The headless libraries that skip Tailwind, like Bits UI, render their parts inside their own
		components. Svelte only scopes your CSS to elements written in the same file, so a selector like
		<code>.trigger</code> never reaches the part and Svelte removes it as unused. The usual fixes
		are bandaids: <code>:global()</code>, which gives up scoping, or wrapping every part in a
		snippet.
	</p>
	<p>distill-ui is built around four ideas:</p>
	<ul>
		<li>
			<strong>Use Svelte natively.</strong> Every element a component styles is written in that
			component's own file, so a plain scoped selector reaches it. When you open
			<code>select-trigger.svelte</code>, the CSS for the trigger is right there.
		</li>
		<li>
			<strong>Keep concerns separate.</strong> The template says what something is. The
			<code>&lt;style&gt;</code> block says how it looks.
		</li>
		<li>
			<strong>Stay readable.</strong> Rules read as plain CSS, like
			<code>background: var(--dui-color-primary)</code>, so anyone who knows CSS can follow them.
		</li>
		<li>
			<strong>You're in control.</strong> The files are yours. Change a token, set an option from a parent,
			or replace the whole style block.
		</li>
	</ul>

	<h2>How it fits together</h2>
	<ul>
		<li>
			<strong>Tokens.</strong> Colors, spacing, radius, fonts and motion are CSS custom properties
			in one set of files, all starting with <code>--dui-</code>. Change them to restyle everything.
			See
			<a href="/docs/theming">Theming</a>.
		</li>
		<li>
			<strong>Components.</strong> Each one reads the tokens and has its own options, like
			<code>--dui-button-bg</code>, that you can set from any parent. See
			<a href="/docs/customizing">Customizing</a>.
		</li>
		<li>
			<strong>Behavior.</strong> Where the browser already does the job, components use native
			elements (Checkbox is a real checkbox). Dialogs, menus, selects and the like get their
			keyboard and screen reader support from <a href="https://melt-ui.com">Melt UI</a>.
		</li>
	</ul>

	<h2>Contributing</h2>
	<p>
		Every component follows the same rules for tokens, options, state attributes and file layout.
		They're written down in
		<a href="https://github.com/pixelpusher829/distill-ui/blob/main/CONVENTIONS.md"
			>CONVENTIONS.md</a
		>.
	</p>

	<h2>Credits</h2>
	<p>
		The component structure follows <a href="https://ui.shadcn.com">shadcn/ui</a> and
		<a href="https://shadcn-svelte.com">shadcn-svelte</a> and
		<a href="https://www.shadcn-vue.com">shadcn-vue</a>, and the behavior comes from Melt UI in
		Svelte and Reka UI in Vue. All are MIT licensed.
	</p>

	<p><a href="/docs/installation">Next: Installation →</a></p>
</article>
