import { reactive } from 'vue';

/*
 * One toaster for the whole app. Call `toast()` from anywhere and the <Toaster />
 * component (placed once, usually in App.vue) shows it.
 */

export type ToastVariant = 'default' | 'success' | 'error';

export type ToastData = {
	title: string;
	description?: string;
	variant?: ToastVariant;
	action?: { label: string; onClick: () => void };
};

type ToastOptions = Omit<ToastData, 'title'> & { duration?: number };

type Toast = { id: string; data: ToastData };

const closeDelay = 5000;
let nextId = 0;

// Each toast closes after its delay. Hovering the toaster pauses every timer and
// leaving it restarts them with the time they had left.
const timers = new Map<string, { remaining: number; started: number; handle?: number }>();

function start(id: string) {
	const timer = timers.get(id);
	if (!timer) return;
	timer.started = Date.now();
	timer.handle = window.setTimeout(() => toaster.remove(id), timer.remaining);
}

export const toaster = reactive({
	toasts: [] as Toast[],

	add(data: ToastData, duration = closeDelay) {
		const id = `toast-${nextId++}`;
		this.toasts.push({ id, data });
		timers.set(id, { remaining: duration, started: 0 });
		start(id);
		return id;
	},

	remove(id: string) {
		window.clearTimeout(timers.get(id)?.handle);
		timers.delete(id);
		this.toasts = this.toasts.filter((t) => t.id !== id);
	},

	pause() {
		for (const timer of timers.values()) {
			window.clearTimeout(timer.handle);
			timer.remaining -= Date.now() - timer.started;
		}
	},

	resume() {
		for (const id of timers.keys()) start(id);
	}
});

function show(title: string, { duration, ...data }: ToastOptions = {}) {
	return toaster.add({ title, ...data }, duration);
}

/** `toast('Saved')`, `toast.success('Saved')`, `toast.error('Failed', { description })`. */
export const toast = Object.assign(show, {
	success: (title: string, options: Omit<ToastOptions, 'variant'> = {}) =>
		show(title, { ...options, variant: 'success' }),
	error: (title: string, options: Omit<ToastOptions, 'variant'> = {}) =>
		show(title, { ...options, variant: 'error' }),
	dismiss: (id: string) => toaster.remove(id)
});
