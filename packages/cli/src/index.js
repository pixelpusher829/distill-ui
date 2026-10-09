#!/usr/bin/env node
// @ts-check
/**
 * The distill-ui CLI.
 *
 *   npx distill-ui init          copy the tokens into your project and import them
 *   npx distill-ui add button    copy components into your project
 *   npx distill-ui list          show the components you can add
 *
 * It only uses Node's built-in modules, so `npx` starts it instantly.
 */
import { parseArgs } from 'node:util';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const DEFAULT_REGISTRY =
	'https://raw.githubusercontent.com/pixelpusher829/distill-ui/main/registry';
const CONFIG_FILE = 'distill-ui.json';

const HELP = `distill-ui: copy-into-your-project components styled with plain CSS.

Usage:
  distill-ui init                 Copy the tokens into your project and import them
  distill-ui add <component...>   Copy components (and any they use) into your project
  distill-ui add --all            Copy every component
  distill-ui list                 Show the components you can add

Options:
  --cwd <path>        Run in another folder (default: the current folder)
  --overwrite         Replace files that already exist
  --no-install        Don't install npm packages, just print the command
  --registry <url>    Where to download components from (a URL or a folder)
  -h, --help          Show this help`;

/**
 * @typedef {{ framework: string, components: string, styles: string, registry?: string }} Config
 * @typedef {{ path: string, content: string }} RegistryFile
 * @typedef {{ name: string, dependencies?: string[], registryDependencies?: string[], files: RegistryFile[] }} RegistryItem
 */

class CliError extends Error {}

async function main() {
	const { values, positionals } = parseArgs({
		allowPositionals: true,
		options: {
			cwd: { type: 'string' },
			overwrite: { type: 'boolean', default: false },
			'no-install': { type: 'boolean', default: false },
			registry: { type: 'string' },
			all: { type: 'boolean', default: false },
			help: { type: 'boolean', short: 'h', default: false }
		}
	});
	const [command, ...names] = positionals;
	const cwd = resolve(values.cwd ?? process.cwd());
	const options = {
		cwd,
		overwrite: values.overwrite,
		install: !values['no-install'],
		registry: values.registry
	};

	if (values.help || !command) {
		console.log(HELP);
		return;
	}
	if (command === 'init') await init(options);
	else if (command === 'add') await add(names, values.all, options);
	else if (command === 'list') await list(options);
	else throw new CliError(`Unknown command "${command}".\n\n${HELP}`);
}

// --- Commands ---------------------------------------------------------------

/** @param {{ cwd: string, overwrite: boolean, registry?: string }} options */
async function init({ cwd, overwrite, registry }) {
	const pkg = readPackageJson(cwd);
	const framework = detectFramework(pkg);
	const isKit = hasDependency(pkg, '@sveltejs/kit');

	/** @type {Config} */
	const config = existsSync(join(cwd, CONFIG_FILE))
		? readConfig(cwd)
		: {
				framework,
				components: isKit ? 'src/lib/components/ui' : 'src/components/ui',
				styles: isKit ? 'src/lib/styles/distill-ui' : 'src/styles/distill-ui'
			};
	if (registry) config.registry = registry;

	const tokens = await fetchItem(registrySource(config, cwd), framework, 'tokens');
	const { written, skipped } = writeFiles(join(cwd, config.styles), tokens.files, overwrite);
	report(written, skipped, cwd);

	writeFileSync(join(cwd, CONFIG_FILE), JSON.stringify(config, null, '\t') + '\n');
	console.log(`Saved settings to ${CONFIG_FILE}.`);

	if (isKit) {
		const layout = importTokensInLayout(cwd, config.styles, libAlias(pkg));
		if (layout) console.log(`Imported the tokens in ${layout}.`);
	} else {
		console.log(
			`\nImport the tokens once, in your app's entry file:\n  import './${config.styles.replace(/^src\//, '')}/tokens.css';`
		);
	}
	console.log('\nDone. Add components with: npx distill-ui add button');
}

/**
 * @param {string[]} names
 * @param {boolean} all
 * @param {{ cwd: string, overwrite: boolean, install: boolean, registry?: string }} options
 */
async function add(names, all, { cwd, overwrite, install, registry }) {
	const config = readConfig(cwd);
	if (registry) config.registry = registry;
	const source = registrySource(config, cwd);

	const index = await fetchIndex(source, config.framework);
	const available = new Map(index.components.map((item) => [item.name, item]));
	if (all) names = [...available.keys()];
	if (!names.length)
		throw new CliError('Name the components to add, like: npx distill-ui add button');

	const unknown = names.filter((name) => !available.has(name));
	if (unknown.length) {
		throw new CliError(
			`No component named ${unknown.map((n) => `"${n}"`).join(', ')}. Run \`npx distill-ui list\` to see them all.`
		);
	}

	// Include the components these ones use (Dialog uses Button, for example).
	const wanted = new Set();
	/** @param {string} name */
	const visit = (name) => {
		if (wanted.has(name)) return;
		wanted.add(name);
		for (const dep of available.get(name)?.registryDependencies ?? []) visit(dep);
	};
	names.forEach(visit);

	const items = await Promise.all(
		[...wanted].map((name) => fetchItem(source, config.framework, name))
	);

	const written = [];
	const skipped = [];
	for (const item of items) {
		const result = writeFiles(join(cwd, config.components), item.files, overwrite);
		written.push(...result.written);
		skipped.push(...result.skipped);
	}
	report(written, skipped, cwd);

	const pkg = readPackageJson(cwd);
	const missing = [...new Set(items.flatMap((item) => item.dependencies ?? []))].filter(
		(dep) => !hasDependency(pkg, packageName(dep))
	);
	if (missing.length) installPackages(cwd, missing, install);

	// `#lib` follows Node's import rules, so it needs the full file path.
	const alias = libAlias(pkg);
	const folder = config.components.startsWith('src/lib/')
		? `${alias}/${config.components.slice('src/lib/'.length)}`
		: `./${config.components}`;
	const importPath = `${folder}/${names[0]}${alias === '#lib' ? '/index.js' : ''}`;
	console.log(`\nDone. Use it like: import { ... } from '${importPath}';`);
}

/** @param {{ cwd: string, registry?: string }} options */
async function list({ cwd, registry }) {
	const config = existsSync(join(cwd, CONFIG_FILE))
		? readConfig(cwd)
		: { framework: 'svelte', components: '', styles: '' };
	if (registry) config.registry = registry;
	const index = await fetchIndex(registrySource(config, cwd), config.framework);
	console.log(index.components.map((item) => `  ${item.name}`).join('\n'));
}

// --- Project ----------------------------------------------------------------

/** @param {string} cwd */
function readPackageJson(cwd) {
	const path = join(cwd, 'package.json');
	if (!existsSync(path)) {
		throw new CliError(`No package.json in ${cwd}. Run this from your project's folder.`);
	}
	return JSON.parse(readFileSync(path, 'utf8'));
}

/**
 * @param {any} pkg
 * @param {string} name
 */
function hasDependency(pkg, name) {
	return Boolean(pkg.dependencies?.[name] ?? pkg.devDependencies?.[name]);
}

/** @param {any} pkg */
function detectFramework(pkg) {
	if (hasDependency(pkg, 'svelte')) {
		const major = Number(
			String(pkg.dependencies?.svelte ?? pkg.devDependencies?.svelte).match(/\d+/)?.[0]
		);
		if (major && major < 5) throw new CliError('distill-ui needs Svelte 5 or newer.');
		return 'svelte';
	}
	if (hasDependency(pkg, 'vue'))
		throw new CliError('The Vue version of distill-ui is planned but not out yet.');
	throw new CliError(
		"Couldn't find Svelte in package.json. distill-ui works with Svelte 5 projects."
	);
}

/**
 * SvelteKit 3 projects import from src/lib with `#lib` (set in package.json
 * "imports"); older ones use `$lib`.
 *
 * @param {any} pkg
 */
function libAlias(pkg) {
	return pkg.imports?.['#lib/*'] ? '#lib' : '$lib';
}

/** @param {string} cwd */
function readConfig(cwd) {
	const path = join(cwd, CONFIG_FILE);
	if (!existsSync(path)) throw new CliError('Run `npx distill-ui init` first.');
	return /** @type {Config} */ (JSON.parse(readFileSync(path, 'utf8')));
}

/**
 * Adds the tokens import to the root layout, creating the layout if needed.
 * Returns the layout's path, or nothing when it already imports them.
 *
 * @param {string} cwd
 * @param {string} styles
 * @param {string} alias
 */
function importTokensInLayout(cwd, styles, alias) {
	const statement = `import '${alias}/${styles.replace(/^src\/lib\//, '')}/tokens.css';`;
	const path = join(cwd, 'src/routes/+layout.svelte');
	const lang = existsSync(join(cwd, 'tsconfig.json')) ? ' lang="ts"' : '';

	if (!existsSync(path)) {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(
			path,
			`<script${lang}>\n\t${statement}\n\n\tlet { children } = $props();\n</script>\n\n{@render children()}\n`
		);
		return 'src/routes/+layout.svelte';
	}

	const source = readFileSync(path, 'utf8');
	if (source.includes('/tokens.css')) return;
	// The first instance <script> tag, skipping <script module>.
	const script = /<script(?![^>]*\bmodule\b)[^>]*>\n?/.exec(source);
	const updated = script
		? source.slice(0, script.index + script[0].length) +
			`\t${statement}\n` +
			source.slice(script.index + script[0].length)
		: `<script${lang}>\n\t${statement}\n</script>\n\n${source}`;
	writeFileSync(path, updated);
	return 'src/routes/+layout.svelte';
}

/**
 * @param {string} dir
 * @param {RegistryFile[]} files
 * @param {boolean} overwrite
 */
function writeFiles(dir, files, overwrite) {
	const written = [];
	const skipped = [];
	for (const file of files) {
		const path = join(dir, file.path);
		if (!resolve(path).startsWith(resolve(dir)))
			throw new CliError(`Refusing to write outside ${dir}: ${file.path}`);
		if (existsSync(path) && !overwrite) {
			if (readFileSync(path, 'utf8') !== file.content) skipped.push(path);
			continue;
		}
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, file.content);
		written.push(path);
	}
	return { written, skipped };
}

/**
 * @param {string[]} written
 * @param {string[]} skipped
 * @param {string} cwd
 */
function report(written, skipped, cwd) {
	/** @param {string} path */
	const short = (path) => path.slice(cwd.length + 1);
	if (written.length)
		console.log(
			`Wrote ${written.length} files:\n${written.map((p) => `  ${short(p)}`).join('\n')}`
		);
	if (skipped.length) {
		console.log(
			`Kept ${skipped.length} files you already have (use --overwrite to replace them):\n${skipped.map((p) => `  ${short(p)}`).join('\n')}`
		);
	}
}

/** @param {string} dep  like "melt@0.44.0" or "@floating-ui/dom@^1.6.0" */
function packageName(dep) {
	const at = dep.lastIndexOf('@');
	return at > 0 ? dep.slice(0, at) : dep;
}

/**
 * @param {string} cwd
 * @param {string[]} deps
 * @param {boolean} install
 */
function installPackages(cwd, deps, install) {
	const manager =
		existsSync(join(cwd, 'bun.lock')) || existsSync(join(cwd, 'bun.lockb'))
			? 'bun'
			: existsSync(join(cwd, 'pnpm-lock.yaml'))
				? 'pnpm'
				: existsSync(join(cwd, 'yarn.lock'))
					? 'yarn'
					: 'npm';
	const args = [manager === 'npm' ? 'install' : 'add', ...deps];
	if (!install) {
		console.log(
			`\nThese components need some packages. Install them with:\n  ${manager} ${args.join(' ')}`
		);
		return;
	}
	console.log(`\nInstalling ${deps.join(', ')} with ${manager}...`);
	const result = spawnSync(manager, args, {
		cwd,
		stdio: 'inherit',
		shell: process.platform === 'win32'
	});
	if (result.status !== 0) {
		throw new CliError(
			`Installing packages failed. Try running it yourself:\n  ${manager} ${args.join(' ')}`
		);
	}
}

// --- Registry ---------------------------------------------------------------

/**
 * @param {Config} config
 * @param {string} cwd
 */
function registrySource(config, cwd) {
	const source = config.registry ?? process.env.DISTILL_UI_REGISTRY ?? DEFAULT_REGISTRY;
	return /^https?:\/\//.test(source) ? source.replace(/\/$/, '') : resolve(cwd, source);
}

/**
 * Reads a registry file from a URL or a local folder.
 *
 * @param {string} source
 * @param {string} path
 */
async function readRegistry(source, path) {
	if (!/^https?:\/\//.test(source)) {
		const file = join(source, path);
		if (!existsSync(file)) throw new CliError(`Couldn't find ${file}.`);
		return JSON.parse(readFileSync(file, 'utf8'));
	}
	const url = `${source}/${path}`;
	let response;
	try {
		response = await fetch(url);
	} catch {
		throw new CliError(`Couldn't reach ${url}. Check your internet connection.`);
	}
	if (!response.ok) throw new CliError(`Downloading ${url} failed (${response.status}).`);
	return response.json();
}

/**
 * @param {string} source
 * @param {string} framework
 * @returns {Promise<{ components: { name: string, registryDependencies?: string[] }[] }>}
 */
function fetchIndex(source, framework) {
	return readRegistry(source, `${framework}/index.json`);
}

/**
 * @param {string} source
 * @param {string} framework
 * @param {string} name
 * @returns {Promise<RegistryItem>}
 */
function fetchItem(source, framework, name) {
	return readRegistry(source, `${framework}/${name}.json`);
}

main().catch((error) => {
	if (error instanceof CliError) {
		console.error(error.message);
		process.exit(1);
	}
	throw error;
});
