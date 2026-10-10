import { inject, provide } from 'vue';
import type { PlacementRef } from './placement.js';

// The root takes the placement, and the content reads it to position itself.
const key = Symbol('distill-tooltip');
export const provideTooltipPlacement = (placement: PlacementRef) => provide(key, placement);
export const injectTooltipPlacement = () => inject<PlacementRef>(key)!;
