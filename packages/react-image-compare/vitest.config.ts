import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default defineConfig({
	...viteConfig,
	test: {
		coverage: {
			include: ['src/**/*.{ts,tsx}'],
		},
		projects: ['vitest.node.config.ts', 'vitest.storybook.config.ts'],
	},
})
