// @ts-nocheck
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
	site: 'http://localhost:4321',
	vite: {
		build: {
			sourcemap: true,
		},
		// @ts-ignore
		plugins: [
			tailwindcss(), 
			yaml(),
		],
	},
	integrations: [mdx(), sitemap()],
})
