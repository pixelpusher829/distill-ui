<script lang="ts">
	import CopyButton from './CopyButton.svelte';
	import type { Code } from './code.js';
	import { framework, type PerFramework } from './framework.svelte.js';

	// Pass one sample for each framework to follow the Svelte / Vue switch.
	let { code: codes }: { code: Code | PerFramework<Code> } = $props();
	const code = $derived('html' in codes ? codes : codes[framework.current]);
</script>

<figure class="code">
	{#if code.title}
		<figcaption>{code.title}</figcaption>
	{/if}
	<div class="copy">
		<CopyButton text={code.code} label={code.title ? `Copy ${code.title}` : 'Copy code'} />
	</div>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- Shiki output, built from our own files -->
	{@html code.html}
</figure>

<style>
	.code {
		position: relative;
		margin: var(--dui-space-4) 0;
		overflow: hidden;
		border: 1px solid var(--dui-color-border);
		border-radius: var(--dui-radius-lg);
		font-size: var(--dui-text-sm);
	}

	figcaption {
		padding: var(--dui-space-2) var(--dui-space-4);
		border-bottom: 1px solid var(--dui-color-border);
		color: var(--dui-color-muted-foreground);
		font-family: var(--dui-font-mono);
		font-size: var(--dui-text-xs);
	}

	.copy {
		position: absolute;
		inset-block-start: var(--dui-space-1);
		inset-inline-end: var(--dui-space-1);
		--dui-button-height: 1.75rem;
	}

	figcaption + .copy {
		inset-block-start: 0;
	}
</style>
