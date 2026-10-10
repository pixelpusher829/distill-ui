// @ts-check
/**
 * Builds the registry the CLI installs from. For each framework (registry/svelte/
 * and registry/vue/) it writes one JSON file per component, plus `tokens.json`
 * (the CSS files `init` copies) and `index.json` (the list of everything
 * available).
 *
 * Run with `bun run registry`. Pass `--check` to fail instead of writing when
 * the registry is out of date (used by `bun run test`).
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = join(import.meta.dirname, '..');
const tokensDir = join(root, 'packages/tokens');
const check = process.argv.includes('--check');

/**
 * Where each framework's components live, the package.json their npm
 * dependencies are pinned in, and the framework package itself (never listed
 * as a dependency, since the project already has it).
 */
const frameworks = [
	{ name: 'svelte', components: 'packages/svelte/src/lib/components/ui', pkg: 'packages/svelte' },
	{ name: 'vue', components: 'packages/vue/src/components/ui', pkg: 'packages/vue' }
];

/** @param {string} dir */
function listFiles(dir) {
	return readdirSync(dir, { recursive: true, withFileTypes: true })
		.filter((entry) => entry.isFile())
		.map((entry) => relative(dir, join(entry.parentPath, entry.name)))
		.sort();
}

const tokens = {
	name: 'tokens',
	type: 'tokens',
	files: listFiles(tokensDir)
		.filter((file) => file.endsWith('.css'))
		.map((file) => ({ path: file, content: readFileSync(join(tokensDir, file), 'utf8') }))
};

/**
 * @param {typeof frameworks[number]} framework
 * @returns {Record<string, string>}
 */
function build(framework) {
	const componentsDir = join(root, framework.components);
	/** npm packages a component may import, pinned to the versions we test with. */
	const pinned = JSON.parse(
		readFileSync(join(root, framework.pkg, 'package.json'), 'utf8')
	).dependencies;

	/** @type {Record<string, string>} */
	const output = {};

	const components = readdirSync(componentsDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort();

	/** @type {{ name: string, dependencies: string[], registryDependencies: string[] }[]} */
	const index = [];

	for (const name of components) {
		const dir = join(componentsDir, name);
		const files = listFiles(dir).map((file) => ({
			path: `${name}/${file}`,
			content: readFileSync(join(dir, file), 'utf8')
		}));
		const source = files.map((file) => file.content).join('\n');

		// npm packages: any import that isn't relative and isn't the framework itself.
		const packages = new Set();
		for (const [, spec] of source.matchAll(/from '([^'.][^']*)'/g)) {
			const pkg = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
			if (pkg !== framework.name) packages.add(pkg);
		}
		// Melt lists @floating-ui/dom as a peer dependency, so install it alongside.
		if (packages.has('melt')) packages.add('@floating-ui/dom');
		const dependencies = [...packages].sort().map((pkg) => {
			const version = pinned[pkg];
			if (!version) throw new Error(`${name} imports ${pkg}, which isn't in ${framework.pkg}`);
			return `${pkg}@${version}`;
		});

		// Other components: imports like '../button/index.js'.
		const registryDependencies = [
			...new Set([...source.matchAll(/from '\.\.\/([^/']+)\//g)].map((match) => match[1]))
		].sort();

		const item = { name, type: 'component', dependencies, registryDependencies, files };
		output[`${name}.json`] = JSON.stringify(item, null, '\t') + '\n';
		index.push({ name, dependencies, registryDependencies });
	}

	output['tokens.json'] = JSON.stringify(tokens, null, '\t') + '\n';
	output['index.json'] = JSON.stringify({ components: index }, null, '\t') + '\n';
	return output;
}

let failed = false;
for (const framework of frameworks) {
	const outDir = join(root, 'registry', framework.name);
	const output = build(framework);
	const stale = Object.entries(output).filter(([file, content]) => {
		const path = join(outDir, file);
		return !existsSync(path) || readFileSync(path, 'utf8') !== content;
	});
	const expected = new Set(Object.keys(output));
	const extra = existsSync(outDir) ? readdirSync(outDir).filter((file) => !expected.has(file)) : [];

	if (check) {
		if (stale.length || extra.length) {
			console.error(
				`The ${framework.name} registry is out of date (${[...stale.map(([file]) => file), ...extra].join(', ')}). Run \`bun run registry\`.`
			);
			failed = true;
		} else console.log(`The ${framework.name} registry is up to date.`);
	} else {
		mkdirSync(outDir, { recursive: true });
		for (const [file, content] of stale) writeFileSync(join(outDir, file), content);
		if (extra.length)
			console.warn(`Not in the source any more, delete by hand: ${extra.join(', ')}`);
		console.log(`Wrote ${stale.length} of ${expected.size} ${framework.name} registry files.`);
	}
}
if (failed) process.exit(1);
