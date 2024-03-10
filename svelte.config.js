import adapter from "@sveltejs/adapter-netlify";
/* Other imports here */
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';



/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	extensions: ['.svelte', '.md'],

	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: 'src/routes/blog/post.svelte'
			}
		})
	]
};

export default config;
