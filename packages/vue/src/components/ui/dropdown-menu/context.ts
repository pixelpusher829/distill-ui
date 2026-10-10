import { inject, provide, type Ref } from 'vue';
import type { PlacementRef } from './placement.js';

// The root shares its open state and placement with the parts. `focusLast` lets the trigger
// open the menu on the last item (ArrowUp), which Reka doesn't do on its own.
type DropdownMenuContext = { open: Ref<boolean>; placement: PlacementRef; focusLast: Ref<boolean> };

const key = Symbol('distill-dropdown-menu');
export const provideDropdownMenu = (ctx: DropdownMenuContext) => provide(key, ctx);
export const injectDropdownMenu = () => inject<DropdownMenuContext>(key)!;
