import { getContext, setContext } from 'svelte';
import type { Dialog } from 'melt/builders';

// Melt gives one builder object per dialog; the parts share it through context.
// Melt doesn't wire up aria-labelledby / aria-describedby, so we carry the ids too.
type SheetContext = { dialog: Dialog; titleId: string; descriptionId: string };

const key = Symbol('distill-sheet');
export const setSheetContext = (ctx: SheetContext) => setContext(key, ctx);
export const getSheetContext = () => getContext<SheetContext>(key);
