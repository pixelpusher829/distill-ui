<script lang="ts">
	import Meta from '#lib/docs/Meta.svelte';
	import { Button } from '@distill-ui/svelte';
	import CodeBlock from '#lib/docs/CodeBlock.svelte';
	import ThemePlayground from '#lib/docs/ThemePlayground.svelte';
	import type { Code } from '#lib/docs/code.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// The page is written for both frameworks; app.css shows the one picked in the header.
	const frameworks = ['svelte', 'vue'] as const;

	const first = {
		svelte: {
			title: 'Svelte, used the way it was designed',
			body: 'Svelte scopes the CSS in each component for you. distill-ui leans on that instead of working around it: no :global(), no child snippets, no build plugin.'
		},
		vue: {
			title: 'Vue, used the way it was designed',
			body: 'Vue scopes the CSS in each component with \x3Cstyle scoped>. distill-ui leans on that instead of working around it: no unscoped style blocks, no :deep() from a wrapper, no build plugin.'
		}
	};

	const reasons = [
		{
			title: 'Markup in the markup, styles in the style block',
			body: 'Your template says what the thing is. The style block says what it looks like. Neither one is buried in the other.'
		},
		{
			title: 'Readable by anyone who knows CSS',
			body: 'background: var(--dui-color-primary) reads like what it does. There is no class vocabulary to learn and nothing to decode.'
		},
		{
			title: 'Yours to change',
			body: 'Components are copied into your project, not hidden in node_modules. Change a token, set an option from a parent, or rewrite the whole style block.'
		}
	];

	const code = (svelte: Code, vue: Code) => ({ svelte, vue });
	// Written as \x3C so Svelte doesn't mistake them for the component's own style block.
	const styleTag = { svelte: '\x3Cstyle>', vue: '\x3Cstyle scoped>' };
</script>

{#snippet only(framework: 'svelte' | 'vue', svelte: string, vue: string)}
	<span data-only={framework}>{framework === 'vue' ? vue : svelte}</span>
{/snippet}

{#snippet word(svelte: string, vue: string)}
	{#each frameworks as f (f)}{@render only(f, svelte, vue)}{/each}
{/snippet}

{#snippet codeFor(pair: { svelte: Code; vue: Code })}
	{#each frameworks as f (f)}
		<div data-only={f}><CodeBlock code={pair[f]} /></div>
	{/each}
{/snippet}

<Meta
	title="distill-ui: Svelte and Vue components styled with plain CSS"
	description="Accessible Svelte 5 and Vue 3 components you copy into your project and style with plain scoped CSS. No Tailwind, no :global(), no workarounds."
/>

<div class="page">
	<section class="hero">
		<p class="eyebrow">{@render word('Svelte 5', 'Vue 3')} · Plain CSS · No Tailwind</p>
		<h1>
			<span class="accent">Scoped CSS,</span>
			the way {@render word('Svelte', 'Vue')} intended.
		</h1>
		<p class="lead">
			distill-ui is a set of accessible components you copy into your {@render word(
				'Svelte',
				'Vue'
			)}
			project and style with a normal <code>{@render word(styleTag.svelte, styleTag.vue)}</code>
			block: pure CSS, the way it was meant to be written. No utility classes, no
			<code>{@render word(':global()', ':deep()')}</code>, no workarounds.
		</p>
		<div class="actions">
			<Button href="/docs/installation" size="lg">Get started</Button>
			<Button href="/docs/components/button" variant="outline" size="lg">Browse components</Button>
		</div>
	</section>

	<section class="why" aria-labelledby="why-title">
		<header class="section-head">
			<p class="kicker">Why this exists</p>
			<h2 id="why-title">Component libraries stopped writing CSS.</h2>
			<p>
				Most {@render word('Svelte', 'Vue')} component libraries are built on Tailwind. That works for
				a lot of people. But if you'd rather write CSS, you're left with headless libraries that render
				their parts somewhere your scoped styles can't reach. The usual fixes are band-aids, not solutions.
				distill-ui is for people who want control, clean separation, and scoped
				{@render word('Svelte', 'Vue')} styles without the workarounds.
			</p>
		</header>
		<ol class="reasons">
			<li>
				<span class="num" aria-hidden="true">01</span>
				<h3>{@render word(first.svelte.title, first.vue.title)}</h3>
				<p>{@render word(first.svelte.body, first.vue.body)}</p>
			</li>
			{#each reasons as reason, i (reason.title)}
				<li>
					<span class="num" aria-hidden="true">{String(i + 2).padStart(2, '0')}</span>
					<h3>{reason.title}</h3>
					<p>{reason.body}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section aria-labelledby="readable-title">
		<header class="section-head">
			<p class="kicker">Readable</p>
			<h2 id="readable-title">More lines, less to decode.</h2>
			<p>
				A style block is longer than a class string. It's also something you can read top to bottom,
				search, and change one line of without breaking the rest.
			</p>
		</header>
		<div class="compare">
			<div class="side">
				<p class="tag">Utility classes</p>
				<CodeBlock code={data.code.utility} />
			</div>
			<div class="side">
				<p class="tag good">distill-ui</p>
				{@render codeFor(code(data.code.plain, data.code.plainVue))}
			</div>
		</div>
	</section>

	<section aria-labelledby="scoped-title">
		<header class="section-head">
			<p class="kicker">Scoped</p>
			<h2 id="scoped-title">Your selector reaches the element.</h2>
			<p data-only="svelte">
				Headless libraries render each part inside their own components, so Svelte never sees the
				element your selector is aimed at. The fixes are <code>:global()</code>, which leaks your
				styles to the whole app, or a child snippet around every part you want to style. distill-ui
				writes every element in the component's own file, already styled. To change it, update the
				styles directly in the component's source file.
			</p>
			<p data-only="vue">
				Headless libraries render each part inside their own components, and teleport menus and
				dialogs to the end of the page, so a scoped selector often can't reach the element it's
				aimed at. The fixes are an unscoped <code>&lt;style&gt;</code> block, which leaks your
				styles to the whole app, or <code>:deep()</code> from a wrapper, which still misses anything teleported.
				distill-ui writes every element in the component's own file, already styled. To change it, update
				the styles directly in the component's source file.
			</p>
		</header>
		<div class="compare">
			<div class="side">
				<p class="tag">Headless library</p>
				{@render codeFor(code(data.code.before, data.code.beforeVue))}
			</div>
			<div class="side">
				<p class="tag good">distill-ui</p>
				{@render codeFor(code(data.code.after, data.code.afterVue))}
			</div>
		</div>
	</section>

	<section aria-labelledby="play-title">
		<header class="section-head">
			<p class="kicker">Try it</p>
			<h2 id="play-title">Three variables. Every component.</h2>
			<p>
				Colors, corners and spacing are CSS custom properties. Drag a slider and the whole card
				follows, because every part reads the same tokens.
			</p>
		</header>
		<ThemePlayground />
	</section>

	<section class="features" aria-label="What you get">
		<div>
			<h3>20 components</h3>
			<p>Buttons, forms, dialogs, menus, selects, tabs, toasts and more, with more on the way.</p>
		</div>
		<div>
			<h3>Accessible by default</h3>
			<p>
				Native elements where the browser does the job, {@render word('Melt UI', 'Reka UI')} for dialogs,
				menus and selects. Checked with axe in light and dark.
			</p>
		</div>
		<div>
			<h3>Dark mode built in</h3>
			<p>Follows the system setting, or set it yourself with one attribute on the page.</p>
		</div>
		<div>
			<h3>Restyle from anywhere</h3>
			<p>
				Set <code>--dui-button-bg</code> on any parent, in your own scoped CSS, and it just applies.
			</p>
		</div>
	</section>

	<section class="start" aria-labelledby="start-title">
		<h2 id="start-title">Start in two commands</h2>
		<CodeBlock code={data.code.start} />
		<p>
			<a href="/docs/installation">Read the installation guide</a> or
			<a href="/docs/installation#manual">copy the files by hand</a>.
		</p>
	</section>

	<footer>
		<p>
			MIT licensed. Built on <a href="https://melt-ui.com">Melt UI</a> and
			<a href="https://reka-ui.com">Reka UI</a>, with component structure from
			<a href="https://shadcn-svelte.com">shadcn-svelte</a> and
			<a href="https://www.shadcn-vue.com">shadcn-vue</a>.
		</p>
	</footer>
</div>

<style>
	.page {
		max-width: 68rem;
		margin: 0 auto;
		padding: 0 var(--dui-space-6);
	}

	section {
		padding-block: 5rem;
	}

	/* Hero */

	/* The hero's main button uses the site's accent. The hover color is worked out on :root, so it's redone here. */
	.hero {
		--dui-color-primary: var(--site-accent);
		--dui-color-primary-foreground: var(--site-accent-foreground);
		--dui-color-primary-hover: color-mix(in oklch, var(--site-accent) 85%, transparent);
		--dui-color-ring: var(--site-accent);

		position: relative;
		isolation: isolate;
		max-width: 50rem;
		margin-inline: auto;
		padding-top: 6rem;
		text-align: center;

		/* A fading grid behind the headline. */
		&::before {
			content: '';
			position: absolute;
			inset: -2rem calc(50% - 50vw) auto;
			z-index: -1;
			height: 34rem;
			background:
				linear-gradient(var(--dui-color-border) 1px, transparent 1px) 0 0 / 3rem 3rem,
				linear-gradient(90deg, var(--dui-color-border) 1px, transparent 1px) 0 0 / 3rem 3rem;
			mask-image: radial-gradient(ellipse 60% 70% at 50% 30%, black, transparent 75%);
			pointer-events: none;
		}
	}

	.eyebrow {
		display: inline-block;
		margin: 0 0 var(--dui-space-6);
		padding: var(--dui-space-1) var(--dui-space-3);
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-full);
		background: var(--dui-color-background);
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-xs);
		font-weight: var(--dui-font-weight-medium);
		letter-spacing: 0.02em;
	}

	h1 {
		margin: 0;
		font-family: var(--site-font-display);
		font-size: clamp(2.5rem, 7vw, 4.75rem);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.04em;
	}

	.accent {
		color: var(--site-accent);
	}

	.lead {
		max-width: 38rem;
		margin: var(--dui-space-6) auto 0;
		color: var(--dui-color-muted-foreground);
		font-size: 1.1875rem;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--dui-space-3);
		margin-top: var(--dui-space-8);
	}

	/* Section headings */

	.section-head {
		max-width: 44rem;
		margin-bottom: var(--dui-space-10);

		& > p:not(.kicker) {
			margin: var(--dui-space-4) 0 0;
			color: var(--dui-color-muted-foreground);
			font-size: 1.0625rem;
			line-height: 1.65;
		}
	}

	.kicker {
		margin: 0 0 var(--dui-space-3);
		color: var(--site-accent);
		font-family: var(--dui-font-mono);
		font-size: var(--dui-text-xs);
		font-weight: var(--dui-font-weight-semibold);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h2 {
		margin: 0;
		font-family: var(--site-font-display);
		font-size: clamp(1.875rem, 4vw, 2.75rem);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	/* Why */

	.why {
		border-block: 1px solid var(--dui-color-border);

		/* A touch wider so the intro doesn't end on a single word. */
		& .section-head {
			max-width: 47rem;
		}
	}

	.reasons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: var(--dui-space-4);
		margin: 0;
		padding: 0;
		list-style: none;

		& li {
			padding: var(--dui-space-6);
			border: 1px solid var(--dui-color-border);
			border-radius: var(--dui-radius-xl);
			background: var(--dui-color-card);
		}

		& .num {
			color: var(--site-accent);
			font-family: var(--dui-font-mono);
			font-size: var(--dui-text-sm);
			font-weight: var(--dui-font-weight-semibold);
		}

		& h3 {
			margin: var(--dui-space-3) 0 var(--dui-space-2);
			font-size: var(--dui-text-lg);
			line-height: 1.3;
		}

		& p {
			margin: 0;
			color: var(--dui-color-muted-foreground);
			font-size: var(--dui-text-sm);
			line-height: 1.65;
		}
	}

	/* Comparisons */

	.compare {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
		gap: var(--dui-space-5);
		align-items: start;

		& :global(.code) {
			margin: 0;
		}
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: var(--dui-space-2);
		margin: 0 0 var(--dui-space-3);
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
		font-weight: var(--dui-font-weight-medium);

		&::before {
			content: '';
			width: 0.5rem;
			height: 0.5rem;
			border-radius: var(--dui-radius-full);
			background: var(--dui-color-muted-foreground);
		}

		&.good {
			color: var(--dui-color-foreground);

			&::before {
				background: var(--site-accent);
			}
		}
	}

	/* Features */

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		gap: var(--dui-space-8);
		border-top: 1px solid var(--dui-color-border);

		& h3 {
			margin: 0 0 var(--dui-space-2);
			font-size: var(--dui-text-base);
		}

		& p {
			margin: 0;
			color: var(--dui-color-muted-foreground);
			font-size: var(--dui-text-sm);
			line-height: 1.6;
		}
	}

	/* Start */

	.start {
		max-width: 36rem;
		margin-inline: auto;
		padding-top: 0;
		text-align: center;

		& h2 {
			margin-bottom: var(--dui-space-6);
		}

		& :global(.code) {
			text-align: start;
		}

		& p {
			color: var(--dui-color-muted-foreground);
		}
	}

	code {
		font-family: var(--dui-font-mono);
		font-size: 0.875em;
	}

	footer {
		padding-block: var(--dui-space-8);
		border-top: 1px solid var(--dui-color-border);
		color: var(--dui-color-muted-foreground);
		font-size: var(--dui-text-sm);
		text-align: center;
	}

	@media (max-width: 40rem) {
		.page {
			padding-inline: var(--dui-space-4);
		}

		section {
			padding-block: 3.5rem;
		}

		.hero {
			padding-top: 4rem;
		}
	}
</style>
