# just-web-react-image-compare

[![GitHub Release][github-release]][github-action-url]

The monorepo for [`@just-web/react-image-compare`](packages/react-image-compare),
a React component that compares two images side by side, with a swipe divider, or as an onion skin.

## [@just-web/react-image-compare](packages/react-image-compare)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][npm-url]

See the [package readme](packages/react-image-compare/readme.md) for install and usage.

## Development

```sh
pnpm install
pnpm verify   # lint, knip, build, tests (including the Storybook browser tests), size, typecheck
pnpm ic sb    # Storybook for the component on port 6016
```

Releases go through [Changesets](https://github.com/changesets/changesets): add one with `pnpm cs`.

[downloads-image]: https://img.shields.io/npm/dm/@just-web/react-image-compare.svg?style=flat
[github-action-url]: https://github.com/justland/just-web-react-image-compare/actions/workflows/release.yml
[github-release]: https://github.com/justland/just-web-react-image-compare/actions/workflows/release.yml/badge.svg
[npm-image]: https://img.shields.io/npm/v/@just-web/react-image-compare.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@just-web/react-image-compare
