/** A highlighted code sample: the raw code to copy and the HTML to show. */
export type Code = { code: string; html: string; lang: string; title?: string };

/** Folder names for the names the packages export, when they differ from kebab-case. */
const folders: Record<string, string> = { toast: 'toast', Toaster: 'toast' };

function folderFor(name: string) {
	return folders[name] ?? name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Components with parts are imported as a namespace: `import * as Dialog from …`. */
const namespaces = new Set([
	'Alert',
	'AlertDialog',
	'Avatar',
	'Card',
	'Dialog',
	'DropdownMenu',
	'Popover',
	'RadioGroup',
	'Select',
	'Sheet',
	'Tabs',
	'Tooltip'
]);

/**
 * The demos import from the workspace packages. In a real project the files live in the
 * components folder the CLI sets up, so rewrite the import to what a user would write.
 */
export function toProjectImports(source: string, framework: 'svelte' | 'vue' = 'svelte') {
	const pkg = new RegExp(`import \\{ ([^}]+) \\} from '@distill-ui/${framework}';`);
	return source.replace(pkg, (_, names: string) => {
		const byFolder = new Map<string, string[]>();
		for (const name of names.split(',').map((n) => n.trim())) {
			const folder = folderFor(name);
			byFolder.set(folder, [...(byFolder.get(folder) ?? []), name]);
		}
		return [...byFolder]
			.map(([folder, list]) => {
				const path =
					framework === 'vue'
						? `'@/components/ui/${folder}'`
						: `'#lib/components/ui/${folder}/index.js'`;
				return list.length === 1 && namespaces.has(list[0])
					? `import * as ${list[0]} from ${path};`
					: `import { ${list.join(', ')} } from ${path};`;
			})
			.join(framework === 'vue' ? '\n' : '\n\t');
	});
}
