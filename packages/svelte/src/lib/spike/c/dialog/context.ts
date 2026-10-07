import { getContext, setContext } from 'svelte';
import type { Dialog } from 'melt/builders';

// Melt gives one builder object per dialog; the parts share it through context.
// Melt doesn't wire up aria-labelledby / aria-describedby, so we carry the ids too.
type DialogContext = { dialog: Dialog; titleId: string; descriptionId: string };

const key = Symbol('distill-dialog');
export const setDialogContext = (ctx: DialogContext) => setContext(key, ctx);
export const getDialogContext = () => getContext<DialogContext>(key);
