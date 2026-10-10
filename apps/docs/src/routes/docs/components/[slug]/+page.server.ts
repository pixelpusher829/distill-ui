import { error } from '@sveltejs/kit';
import { builtOn, components } from '#lib/docs/components.js';
import { toProjectImports } from '#lib/docs/code.js';
import type { Framework } from '#lib/docs/framework.svelte.js';
import { highlight } from '#lib/docs/highlight.server.js';
import { cssOptions } from '#lib/docs/options.js';
import type { EntryGenerator, PageServerLoad } from './$types';

type RegistryItem = {
	name: string;
	dependencies: string[];
	registryDependencies: string[];
	files: { path: string; content: string }[];
};

const demoSources = import.meta.glob<string>('/src/lib/demos/{svelte,vue}/*.{svelte,vue}', {
	query: '?raw',
	import: 'default',
	eager: true
});

// The same files the CLI installs, built by `bun run registry`.
const registry = import.meta.glob<RegistryItem>('../../../../../../../registry/*/*.json', {
	import: 'default',
	eager: true
});

function registryItem(framework: Framework, name: string) {
	const entry = Object.entries(registry).find(([path]) =>
		path.endsWith(`/${framework}/${name}.json`)
	);
	if (!entry) error(500, `No ${framework} registry item for ${name}. Run \`bun run registry\`.`);
	return entry[1];
}

/** Where the CLI puts components by default, as shown above each file. */
const componentsFolder = { svelte: 'src/lib/components/ui', vue: 'src/components/ui' };

export const entries: EntryGenerator = () => components.map(({ slug }) => ({ slug }));

export const load: PageServerLoad = async ({ params }) => {
	const index = components.findIndex((c) => c.slug === params.slug);
	if (index === -1) error(404, 'No component with that name');
	const doc = components[index];
	const items = { svelte: registryItem('svelte', doc.slug), vue: registryItem('vue', doc.slug) };

	const demoCode = (file: string, framework: Framework) =>
		highlight(
			toProjectImports(demoSources[`/src/lib/demos/${framework}/${file}.${framework}`], framework),
			framework
		);
	const demos = await Promise.all(
		doc.demos.map(async (demo) => ({
			...demo,
			code: { svelte: await demoCode(demo.file, 'svelte'), vue: await demoCode(demo.file, 'vue') }
		}))
	);

	const filesFor = (framework: Framework) =>
		Promise.all(
			items[framework].files.map((file) =>
				highlight(
					file.content,
					file.path.endsWith('.svelte') ? 'svelte' : file.path.endsWith('.vue') ? 'vue' : 'ts',
					`${componentsFolder[framework]}/${file.path}`
				)
			)
		);
	const packagesFor = async (framework: Framework) => {
		const deps = items[framework].dependencies;
		return {
			names: deps.map((dep) => dep.slice(0, dep.lastIndexOf('@'))),
			code: deps.length ? await highlight(`npm install ${deps.join(' ')}`, 'sh') : undefined
		};
	};
	const usesFor = (framework: Framework) =>
		items[framework].registryDependencies.map(
			(name) => components.find((c) => c.slug === name) ?? { slug: name, name }
		);

	return {
		doc,
		builtOn: { svelte: builtOn(doc, 'svelte'), vue: builtOn(doc, 'vue') },
		demos,
		files: { svelte: await filesFor('svelte'), vue: await filesFor('vue') },
		install: await highlight(`npx distill-ui add ${doc.slug}`, 'sh'),
		packages: { svelte: await packagesFor('svelte'), vue: await packagesFor('vue') },
		uses: { svelte: usesFor('svelte'), vue: usesFor('vue') },
		options: cssOptions(items.svelte.files, doc.slug),
		previous: components[index - 1],
		next: components[index + 1]
	};
};
