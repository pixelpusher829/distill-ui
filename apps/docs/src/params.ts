import { defineParams } from '@sveltejs/kit/params';

export const params = defineParams({
	// The docs are at /svelte/docs/... and /vue/docs/..., one page per framework.
	framework: (param) => (param === 'svelte' || param === 'vue' ? param : undefined)
});
