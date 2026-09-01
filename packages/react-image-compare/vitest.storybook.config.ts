import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { browserTestPreset } from '@repobuddy/vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import type { PluginOption } from 'vite'
import { defineProject } from 'vitest/config'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineProject({
	plugins: [
		// The plugin will run tests for the stories defined in your Storybook config
		// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
		storybookTest({
			configDir: path.join(dirname, '.storybook'),
		}),
		// @repobuddy/vitest 2.1.2 is the latest release and its types are built
		// against vitest 4.0. browserTestPreset()'s config hook declares a
		// `browser.instances` shape that vitest 4.1 retyped as
		// BrowserInstanceOption, so the plugin no longer satisfies PluginOption.
		// The runtime is unaffected — the storybook browser project runs and its
		// tests pass. Drop the cast once @repobuddy/vitest ships 4.1 types.
		browserTestPreset() as PluginOption,
	],
	test: {
		name: 'storybook',
		browser: {
			enabled: true,
			headless: true,
			provider: playwright(),
			instances: [
				{
					browser: 'chromium',
				},
			],
		},
		setupFiles: ['.storybook/vitest.setup.ts'],
	},
})
