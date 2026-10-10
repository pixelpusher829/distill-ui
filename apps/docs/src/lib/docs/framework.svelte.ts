/**
 * Which framework the docs show code for. It's saved so it sticks across pages and visits;
 * app.html copies the saved choice onto <html data-framework> before the page paints.
 */
export type Framework = 'svelte' | 'vue';

export const frameworks: { id: Framework; name: string }[] = [
	{ id: 'svelte', name: 'Svelte' },
	{ id: 'vue', name: 'Vue' }
];

class FrameworkChoice {
	// Pages are prerendered with Svelte, then switch once they start in the browser.
	current = $state<Framework>('svelte');

	/** Reads the saved choice. Call once the page has hydrated. */
	load() {
		if (document.documentElement.dataset.framework === 'vue') this.current = 'vue';
	}

	set(framework: Framework) {
		this.current = framework;
		document.documentElement.dataset.framework = framework;
		try {
			localStorage.setItem('framework', framework);
		} catch {
			// Private browsing can block storage; the choice still applies to this page.
		}
	}
}

export const framework = new FrameworkChoice();

/** The same thing written for each framework, like a code sample. */
export type PerFramework<T> = Record<Framework, T>;
