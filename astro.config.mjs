// @ts-nocheck
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import cmsMarker from '@nuasite/cms-marker'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'http://localhost:4321',
	vite: {
		build: {
			sourcemap: true,
		},
		// @ts-ignore
		plugins: [tailwindcss()],
	},
	integrations: [mdx(), sitemap(), cmsMarker()],
})
