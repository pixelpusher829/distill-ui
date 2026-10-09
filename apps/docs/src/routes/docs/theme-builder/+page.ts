import light from '@distill-ui/tokens/themes/light.css?raw';
import dark from '@distill-ui/tokens/themes/dark.css?raw';
import type { PageLoad } from './$types';

// The shipped theme files. The builder swaps its colors into them, so what you copy is the
// same file you already have, with new values.
export const load: PageLoad = () => ({ files: { light, dark } });
