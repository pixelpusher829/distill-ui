import { error } from '@sveltejs/kit';
import { components } from '#lib/docs/components.js';
import { toProjectImports } from '#lib/docs/code.js';
import { highlight } from '#lib/docs/highlight.server.js';
import { cssOptions } from '#lib/docs/options.js';
import type { EntryGenerator, PageServerLoad } from './$types';

type RegistryItem = {
	name: string;
	dependencies: string[];
	registryDependencies: string[];
	files: { path: string; content: string }[];
};

const demoSources = import.meta.glob<string>('/src/lib/demos/svelte/*.svelte', {
	query: '?raw',
	import: 'default',
	eager: true
});

// The same files the CLI installs, built by `bun run registry`.
const registry = import.meta.glob<RegistryItem>('../../../../../../../registry/svelte/*.json', {
	import: 'default',
	eager: true
});

function registryItem(name: string) {
	const entry = Object.entries(registry).find(([path]) => path.endsWith(`/${name}.json`));
	if (!entry) error(500, `No registry item for ${name}. Run \`bun run registry\`.`);
	return entry[1];
}

export const entries: EntryGenerator = () => components.map(({ slug }) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const index = components.findIndex((c) => c.slug === params.slug);
	if (index === -1) error(404, 'No component with that name');
	const doc = components[index];
	const item = registryItem(doc.slug);

	const demos = await Promise.all(
		doc.demos.map(async (demo) => ({
			...demo,
			code: await highlight(
				toProjectImports(demoSources[`/src/lib/demos/svelte/${demo.file}.svelte`]),
				'svelte'
			)
		}))
	);

	const files = await Promise.all(
		item.files.map((file) =>
			highlight(
				file.content,
				file.path.endsWith('.svelte') ? 'svelte' : 'ts',
				`src/lib/components/ui/${file.path}`
			)
		)
	);

	const install = await highlight(`npx distill-ui add ${doc.slug}`, 'sh');
	const packages = item.dependencies.length
		? await highlight(`npm install ${item.dependencies.join(' ')}`, 'sh')
		: undefined;

	return {
		doc,
		demos,
		files,
		install,
		packages,
		uses: item.registryDependencies.map(
			(name) => components.find((c) => c.slug === name) ?? { slug: name, name }
		),
		options: cssOptions(item.files, doc.slug),
		previous: components[index - 1],
		next: components[index + 1]
	};
};
