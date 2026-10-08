import { Toaster } from 'melt/builders';

/*
 * One toaster for the whole app. Call `toast()` from anywhere and the <Toaster />
 * component (placed once, usually in your root layout) shows it.
 */

export type ToastVariant = 'default' | 'success' | 'error';

export type ToastData = {
	title: string;
	description?: string;
	variant?: ToastVariant;
	action?: { label: string; onClick: () => void };
};

type ToastOptions = Omit<ToastData, 'title'> & { duration?: number };

export const toaster = new Toaster<ToastData>({ closeDelay: 5000, hover: 'pause-all' });

function show(title: string, { duration, ...data }: ToastOptions = {}) {
	return toaster.addToast({ data: { title, ...data }, closeDelay: duration }).id;
}

/** `toast('Saved')`, `toast.success('Saved')`, `toast.error('Failed', { description })`. */
export const toast = Object.assign(show, {
	success: (title: string, options: Omit<ToastOptions, 'variant'> = {}) =>
		show(title, { ...options, variant: 'success' }),
	error: (title: string, options: Omit<ToastOptions, 'variant'> = {}) =>
		show(title, { ...options, variant: 'error' }),
	dismiss: (id: string) => toaster.removeToast(id)
});
