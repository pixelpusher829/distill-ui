import { inject, provide } from 'vue';
import type { PlacementRef } from './placement.js';

// The root takes the placement, and the content reads it to position itself.
const key = Symbol('distill-popover');
export const providePopoverPlacement = (placement: PlacementRef) => provide(key, placement);
export const injectPopoverPlacement = () => inject<PlacementRef>(key)!;
