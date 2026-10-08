# Conventions

How every distill-ui component is built. The **Shared** section applies to every framework and the Vue version will follow it too. The **Svelte** section is specific to `packages/svelte`.

Change a documented convention only after discussing it (see "Notes for Claude Code" in PLAN-svelte.md).

---

## Shared

### Tokens

All values come from CSS custom properties in `packages/tokens`. Importing `tokens.css` brings in everything:

- `tokens.css`: spacing (`--space-*`), radius (`--radius`, `--radius-sm|md|lg|xl|full`), shadows (`--shadow-xs|sm|md|lg`), fonts (`--font-sans|mono`, `--text-*`, `--font-weight-*`), focus ring width (`--ring-width`) and z-index layers (`--z-*`).
- `themes/light.css` and `themes/dark.css`: colors, named after shadcn's semantic names with a `--color-` prefix (`--color-background`, `--color-primary`, `--color-muted-foreground`, `--color-ring` and so on).
- `motion.css`: durations (`--duration-fast|normal|slow`), easings (`--ease-*`), shared keyframes, and the reduced-motion override.

Rules:

- Never hardcode a color, size, radius, shadow or duration in a component. If a value has no token, add one and note it here.
- Don't add fallbacks for missing tokens (`var(--color-primary, #111)`). Components require `tokens.css`.
- When a theme needs more than a color swap (for example, dark mode giving outline controls a translucent fill), add a semantic token to both themes instead of writing a dark-mode selector in the component. Examples: `--color-control`, `--color-control-hover`, `--color-tab-active`, `--color-tab-active-border`, `--color-switch-track`, `--color-switch-thumb`, `--color-switch-thumb-checked`.

### Dark mode

Dark applies when `<html>` has `class="dark"` or `data-theme="dark"`, or when the OS prefers dark and the page hasn't opted into light (`class="light"` or `data-theme="light"`). Components never check the theme themselves; they read tokens.

### Component custom properties

Every component exposes custom properties for its main visual knobs, falling back to global tokens. Private copies use a `--_` prefix:

```css
.button {
	--_bg: var(--button-bg, var(--color-primary));
	--_fg: var(--button-fg, var(--color-primary-foreground));
	background: var(--_bg);
	color: var(--_fg);
}
```

Consumers override from the element or any ancestor:

```html
<div style="--button-bg: oklch(0.55 0.2 260); --button-radius: 9999px">…</div>
```

Naming: `--<component>-<property>`, or `--<component>-<part>-<property>` for parts (`--select-trigger-width`, `--dialog-overlay-bg`). Variants re-point the private variables and keep the public override first, so `--button-bg` still wins on every variant.

### Variants and sizes

Set with `data-variant` and `data-size` attributes, never with class names or class-merging helpers.

- Variants: `default | secondary | outline | ghost | destructive | link`
- Sizes: `sm | md | lg | icon`

Components only use the names that make sense for them (Select trigger has `sm | md`; Tabs list has `default | line`).

### State attributes

Style the attributes the behavior layer sets. With Melt UI, those are:

| State                                             | Attribute                                       |
| ------------------------------------------------- | ----------------------------------------------- |
| Open (dialog, popover, select content)            | `[data-open]`                                   |
| Active tab                                        | `[data-active]`                                 |
| Highlighted option                                | `[data-highlighted]`                            |
| Orientation                                       | `[data-orientation="horizontal" \| "vertical"]` |
| Disabled (added by us where Melt lacks it)        | `[data-disabled]`, plus `aria-disabled="true"`  |
| Placeholder showing (Select trigger, added by us) | `[data-placeholder]`                            |
| Invalid (any form control)                        | `[aria-invalid="true"]`                         |

Native form controls use their own pseudo-classes (`:checked`, `:indeterminate`, `:disabled`). Don't add a second vocabulary (no `data-state="open"` alongside `data-open`).

### Specificity and cascade layers

Component styles are **unlayered** and kept at **one class plus attribute selectors** (`.trigger[data-active]`). We don't use `@layer`, because overrides are meant to go through custom properties (which specificity doesn't affect) or by editing the copied file directly. Avoid descendant chains, IDs and `!important`.

### Animations

- Entrance and exit use transitions on the open state where the behavior layer closes on `transitionend` (Melt's Dialog does this), and `@starting-style` for elements that appear from `display: none` (popovers).
- Keyframes for anything else live in `motion.css` (`distill-fade-in`, `distill-zoom-in`, `distill-slide-in-from-*` and the matching outs) so both frameworks share them.
- Always use the duration and easing tokens. Under `prefers-reduced-motion: reduce` every duration becomes `0ms`, which also makes Melt close dialogs immediately.

```css
.content {
	opacity: 0;
	scale: 0.95;
	transition:
		opacity var(--duration-fast) var(--ease-out),
		scale var(--duration-fast) var(--ease-out);

	&[data-open] {
		opacity: 1;
		scale: 1;
	}
}
```

### Focus

Every interactive element gets a visible ring:

```css
&:focus-visible {
	outline: none;
	border-color: var(--color-ring);
	box-shadow: 0 0 0 var(--ring-width) color-mix(in oklch, var(--color-ring) 50%, transparent);
}
```

---

## Svelte

### Native elements first

When a native HTML element already gives the full WAI-ARIA behavior, use it instead of a builder. Input, Textarea, Label, Checkbox, Radio Group and Switch are native `<input>`, `<textarea>` and `<label>` elements styled with `appearance: none`, so keyboard support, form submission and screen-reader announcements come from the browser. Radio Group items share one `name`, which gives arrow-key movement and a single tab stop. Switch is a checkbox with `role="switch"`. Check marks and thumbs are `::before` pseudo-elements, and icons are SVG masks so they follow `currentColor`.

Reach for Melt (or a builder of our own) only when no native element does the job.

### Scoping strategy: Melt UI builders on our own elements

Decided in Phase 1a (see PLAN-svelte.md). Every element a component styles is written in that component's own markup, with Melt's attributes spread onto it, so a plain scoped `<style>` block reaches it:

```svelte
<script lang="ts">
	import { getDialogContext } from './context.js';
	const { dialog } = getDialogContext();
</script>

<dialog {...dialog.content} class="content">…</dialog>

<style>
	.content {
		background: var(--dialog-bg, var(--color-popover));
	}
</style>
```

- No `child` snippets and no `:global()` in component files.
- **One exception:** a component may style _consumer-supplied_ children it can't otherwise reach, scoped under its own class, such as icons inside a button: `.button :global(svg)`. Keep it to sizing and pointer events.
- Melt renders popovers and dialogs in the browser's top layer (native `<dialog>`, the popover API), not through a portal, so they stay where they are in the DOM. Custom properties set on an ancestor therefore reach open content too.

### File layout

```
components/ui/<component>/
├── <component>.svelte          # Root: creates the Melt builder, shares it via context
├── <component>-<part>.svelte   # One file per part (trigger, content, item…)
├── context.ts                  # setXContext / getXContext for the builder and shared ids
└── index.ts                    # export { Root, Trigger, Content, … }
```

Consumers import the namespace: `import { Dialog } from '$lib/components/ui/dialog'` then `<Dialog.Root>`, `<Dialog.Trigger>`. Components with no parts (Button) export the component under its own name too: `import { Button } from …`.

### Props pattern

```svelte
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div {...restProps} {...builderProps} class={['content', className]}>
	{@render children?.()}
</div>
```

- Spread `restProps` first and the Melt props after, so behavior attributes can't be overwritten by accident. Put `class` last.
- Merge classes with Svelte's built-in class arrays (`class={['content', className]}`). Never use `cn`, `clsx` or `tailwind-variants`.
- When Melt sets an inline `style` (Select trigger), append the consumer's: `style="{builder.style}; {style ?? ''}"`.
- Triggers and closes that are buttons render our `Button`, so they take `variant` and `size` directly: `<Dialog.Trigger variant="outline">`.

### Filling gaps in Melt

When Melt lacks a feature, add it in our component file, in the same spread-attributes style, and cover it with a browser test. Current additions:

- **Disabled options and tabs.** Melt finds options and tabs by their `data-melt-*` marker attribute. A disabled item drops that marker (and its click and hover handlers), which takes it out of keyboard navigation and typeahead. It also gets `data-disabled` and `aria-disabled="true"`.
- **Dialog title and description.** The root creates ids, and Title, Description and Content use them for `aria-labelledby` and `aria-describedby`.
- **Select option ids.** Melt points `aria-activedescendant` at `getOptionId(value)` without putting that id on the option, so the item adds it.
- **Select label.** `Select.Label` uses Melt's label props, and the content points `aria-labelledby` at it.

Components Melt has no builder for (Checkbox, Switch, Dropdown Menu, Calendar and others) get a small builder of our own that returns spreadable props in the same shape, following the WAI-ARIA Authoring Practices pattern for that component.

### Checks

- `bun run check`: svelte-check with no errors or warnings.
- `bun run lint`: Prettier and ESLint.
- `bun run test`: Playwright tests for keyboard behavior and axe (WCAG 2.2 AA), in light and dark. Run `bunx playwright install chromium` in `apps/docs` once first.
