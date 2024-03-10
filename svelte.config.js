import adapter from "@sveltejs/adapter-netlify";
/* Other imports here */
import sveltePreprocess from 'svelte-preprocess';



/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
	},
	extensions: ['.svelte'],

	preprocess: [
		sveltePreprocess()
	]
};

export default config;
