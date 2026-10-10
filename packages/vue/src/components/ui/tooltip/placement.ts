import type { Ref } from 'vue';

// Placement is written like Floating UI's ('bottom', 'top-start'…), the same as the
// Svelte version. Reka takes it as a side and an alignment, so this splits it.
export type Placement =
	'top' | 'right' | 'bottom' | 'left' | `${'top' | 'right' | 'bottom' | 'left'}-${'start' | 'end'}`;

export function toSideAlign(placement: Placement) {
	const [side, align = 'center'] = placement.split('-') as [
		'top' | 'right' | 'bottom' | 'left',
		('start' | 'end' | 'center')?
	];
	return { side, align };
}

export type PlacementRef = Readonly<Ref<Placement>>;
