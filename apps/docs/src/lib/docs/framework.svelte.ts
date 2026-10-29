import { page } from '$app/state';

/**
 * Which framework the docs show code for. Every docs page has a URL per framework
 * (/svelte/docs/... and /vue/docs/...), so search engines index both. Pages without one, like the
 * home page, follow the visitor's last choice, which is saved so it sticks across visits;
 * app.html copies it onto <html data-framework> before the page paints.
 */
export type Framework = 'svelte' | 'vue';

export const frameworks: { id: Framework; name: string }[] = [
	{ id: 'svelte', name: 'Svelte' },
	{ id: 'vue', name: 'Vue' }
];

export function isFramework(value: string | undefined): value is Framework {
	return value === 'svelte' || value === 'vue';
}

class FrameworkChoice {
	// Pages are prerendered with Svelte, then switch to the saved choice once they start.
	saved = $state<Framework>('svelte');

	/** The framework in the URL, or the saved choice on pages that aren't per framework. */
	get current(): Framework {
		const fromUrl = page.params.framework;
		return isFramework(fromUrl) ? fromUrl : this.saved;
	}

	/** The current framework's name, like 'Svelte', for page titles and descriptions. */
	get name() {
		return this.current === 'vue' ? 'Vue' : 'Svelte';
	}

	/** Reads the saved choice. Call once the page has hydrated. */
	load() {
		if (document.documentElement.dataset.framework === 'vue') this.saved = 'vue';
	}

	set(framework: Framework) {
		this.saved = framework;
		document.documentElement.dataset.framework = framework;
		try {
			localStorage.setItem('framework', framework);
		} catch {
			// Private browsing can block storage; the choice still applies to this page.
		}
	}

	/** A docs path, like '/docs/theming', for the current framework. */
	link(path: string) {
		return `/${this.current}${path}`;
	}
}

export const framework = new FrameworkChoice();

/** The same thing written for each framework, like a code sample. */
export type PerFramework<T> = Record<Framework, T>;
