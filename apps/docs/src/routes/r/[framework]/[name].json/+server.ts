import { error, json } from '@sveltejs/kit';
import type { EntryGenerator, RequestHandler } from './$types';

// The registry the CLI installs from, served by the docs site so the CLI works while the repo
// is private. Built by `bun run registry`; every file becomes a static JSON file at build time.
const files = import.meta.glob<unknown>('../../../../../../../registry/*/*.json', {
	import: 'default',
	eager: true
});

const byPath = new Map(
	Object.entries(files).map(([path, content]) => [path.split('/registry/')[1], content])
);

export const prerender = true;

export const entries: EntryGenerator = () =>
	[...byPath.keys()].map((path) => {
		const [framework, file] = path.split('/');
		return { framework, name: file.replace(/\.json$/, '') };
	});

export const GET: RequestHandler = ({ params }) => {
	const content = byPath.get(`${params.framework}/${params.name}.json`);
	if (!content) error(404, 'Not in the registry');
	return json(content);
};
