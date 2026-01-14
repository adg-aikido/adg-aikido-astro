// @ts-nocheck
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import yaml from '@rollup/plugin-yaml';
import astroBrokenLinksChecker from 'astro-broken-links-checker';

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
	integrations: [
		mdx(), 
		sitemap(),
		astroBrokenLinksChecker({
			logFilePath: 'broken-links.log', // Optional: specify the log file path
			checkExternalLinks: false, // Optional: check external links (currently, caching to disk is not supported, and it is slow)
			throwError: true // Optional: throw an error to fail the build if broken links are found. Defaults to false.
			})
	],
})
