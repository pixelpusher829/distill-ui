# distill-ui

A copy-into-your-project component library for Svelte 5, in the spirit of shadcn/ui, styled with scoped `<style>` blocks and CSS custom properties instead of Tailwind. A Vue version is planned.

Status: early setup. See [PLAN-svelte.md](./PLAN-svelte.md) for the roadmap and [PLAN-vue.md](./PLAN-vue.md) for what comes after.

## Repo layout

- `packages/tokens` – framework-agnostic CSS tokens, themes and keyframes
- `packages/svelte` – the Svelte components (SvelteKit library mode, Melt UI)
- `apps/docs` – SvelteKit docs and playground site

## Getting started

You need [Bun](https://bun.sh) 1.4 or newer.

```sh
bun install
bun run dev
```

Then open the URL it prints (usually http://localhost:5173).

Other scripts, run from the repo root:

- `bun run check` – type-check every package with svelte-check
- `bun run lint` / `bun run format` – Prettier and ESLint
- `bun run build` – build the library and the docs site
- `bun run reference` – clone shadcn-svelte into the gitignored `reference/` folder for comparison

## Credits

Component structure is referenced from [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte), itself a port of [shadcn/ui](https://ui.shadcn.com). Behavior and accessibility come from [Melt UI](https://next.melt-ui.com). All MIT licensed; see [LICENSE](./LICENSE).
