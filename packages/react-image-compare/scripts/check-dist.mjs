// Fails when the built output imports react/jsx-runtime or react/jsx-dev-runtime.
// The Storybook manager shares only react, react-dom and react-dom/client with addons,
// so the automatic JSX runtime crashes there. See the `jsx` setting in tsconfig.json.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist', import.meta.url))
const pattern = /react\/jsx-(dev-)?runtime/

const offenders = []
const walk = (dir) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name)
		if (entry.isDirectory()) walk(path)
		else if (/\.(m|c)?js$/.test(entry.name) && pattern.test(readFileSync(path, 'utf8'))) offenders.push(path)
	}
}
walk(dist)

if (offenders.length > 0) {
	console.error(
		`dist must use the classic JSX runtime, but these files import react/jsx-runtime:\n${offenders.join('\n')}`,
	)
	process.exit(1)
}
process.stdout.write('dist has no react/jsx-runtime import\n')
