# distill-ui

A copy-into-your-project component library for Svelte 5 and Vue 3, in the spirit of shadcn/ui, styled with scoped `<style>` blocks and CSS custom properties instead of Tailwind. The Vue version is in progress.

Status: early setup. See [PLAN-svelte.md](./PLAN-svelte.md) for the roadmap and [PLAN-vue.md](./PLAN-vue.md) for what comes after.

## Repo layout

- `packages/tokens` – framework-agnostic CSS tokens, themes and keyframes
- `packages/svelte` – the Svelte components (SvelteKit library mode, Melt UI)
- `packages/vue` – the Vue components (Reka UI), ported from the Svelte ones
- `apps/docs` – SvelteKit docs and playground site
- `apps/vue-preview` – a Vite page with every Vue component, for development and tests

## Getting started

You need [Bun](https://bun.sh) 1.4 or newer.

```sh
bun install
bun run dev
```

Then open the URL it prints (usually http://localhost:5173).

Other scripts, run from the repo root:

- `bun run dev:vue` – run the Vue preview page
- `bun run check` – type-check every package (svelte-check and vue-tsc)
- `bun run lint` / `bun run format` – Prettier and ESLint
- `bun run build` – build the library and the docs site
- `bun run reference` / `bun run reference:vue` – clone shadcn-svelte or shadcn-vue into the gitignored `reference/` folder for comparison

## Support

distill-ui is free and built in my spare time. If it saves you time, you can [buy me a coffee](https://buymeacoffee.com/jbarnes).

## Credits

Component structure is referenced from [shadcn-svelte](https://github.com/huntabyte/shadcn-svelte), itself a port of [shadcn/ui](https://ui.shadcn.com). Behavior and accessibility come from [Melt UI](https://next.melt-ui.com). The Vue version references [shadcn-vue](https://github.com/unovue/shadcn-vue) and gets its behavior from [Reka UI](https://reka-ui.com). All MIT licensed; see [LICENSE](./LICENSE).
