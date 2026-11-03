# @just-web/react-image-compare

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][npm-url]

A React component that compares two images the way GitHub's image diff does:

- **Side by side**: the two images next to each other.
- **Swipe**: the base image left of a divider and the compare image right of it. Drag anywhere on the image to move the divider.
- **Onion skin**: the compare image over the base image, with a slider for its opacity.

The components use inline styles only.
They need no CSS file or Tailwind, so they render anywhere React does, including the Storybook manager.
The sliders are native `<input type="range">` elements, so they work with the keyboard and screen readers.

## Install

```sh
npm install @just-web/react-image-compare
pnpm add @just-web/react-image-compare
yarn add @just-web/react-image-compare
```

`react` and `react-dom` (18 or later) are peer dependencies.

## Usage

`ImageCompare` shows all three modes with a row of buttons to switch between them.

```tsx
import { ImageCompare } from '@just-web/react-image-compare'

<ImageCompare base="/baseline.png" compare="/result.png" />
```

`base` and `compare` take any `<img>` source, including `data:image/png;base64,...` URLs.

Pick the starting mode, or control it:

```tsx
<ImageCompare base={base} compare={compare} defaultMode="swipe" />

const [mode, setMode] = useState<ImageCompareMode>('onion-skin')
<ImageCompare base={base} compare={compare} mode={mode} onModeChange={setMode} />
```

Hide the switcher to show one mode only:

```tsx
<ImageCompare base={base} compare={compare} mode="swipe" showModeSwitcher={false} />
```

Each view is also exported on its own:

```tsx
import { OnionSkin, SideBySide, Swipe } from '@just-web/react-image-compare'

<SideBySide base={base} compare={compare} />
<Swipe base={base} compare={compare} defaultPosition={30} />
<OnionSkin base={base} compare={compare} defaultOpacity={70} />
```

## Props

### Shared by every view and `ImageCompare`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `base` | `string` | required | The image to compare against, such as a baseline. |
| `compare` | `string` | required | The image being compared, such as a new result. |
| `baseLabel` | `ReactNode` | `"Base"` | Label for the base image. |
| `compareLabel` | `ReactNode` | `"Compare"` | Label for the compare image. |
| `imageAnchor` | `ImageAnchor` | `"top-left"` | Where each image sits when the two differ in size: `top-left`, `top-center`, `top-right`, `middle-left`, `middle-center`, `middle-right`, `bottom-left`, `bottom-center`, or `bottom-right`. |
| `showCheckerPattern` | `boolean` | `true` | Show a checkerboard behind the images so transparent pixels are visible. |
| `compareImageBackgroundColor` | `string` | | Background color behind the compare image. It replaces the checkerboard there. |
| `className`, `style` | | | Applied to the outer element. |

The images share one frame, sized to the larger width and the larger height of the two.
The frame fills the available width up to that size and keeps its aspect ratio, so both images scale together.

### `ImageCompare`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'side-by-side' \| 'swipe' \| 'onion-skin'` | | The mode to show. Set it to control the mode. |
| `defaultMode` | same as `mode` | `"side-by-side"` | The starting mode when uncontrolled. |
| `onModeChange` | `(mode) => void` | | Called when the user picks a mode in the switcher. |
| `showModeSwitcher` | `boolean` | `true` | Show the row of mode buttons. |

The swipe position and the onion skin opacity are kept when the user switches modes.

### `Swipe`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `number` | | Divider position, 0 to 100 from the left. Set it to control the divider. |
| `defaultPosition` | `number` | `50` | The starting position when uncontrolled. |
| `onPositionChange` | `(position) => void` | | Called when the user moves the divider. |

Keyboard: the arrow keys move the divider by 1, Page Up and Page Down by 10, Home and End to the edges.

### `OnionSkin`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `opacity` | `number` | | Opacity of the compare image, 0 to 100. Set it to control the opacity. |
| `defaultOpacity` | `number` | `50` | The starting opacity when uncontrolled. |
| `onOpacityChange` | `(opacity) => void` | | Called when the user moves the slider. |

### `SideBySide`

Takes the shared props only. The two panels wrap into a column when the space is narrow.

[downloads-image]: https://img.shields.io/npm/dm/@just-web/react-image-compare.svg?style=flat
[npm-image]: https://img.shields.io/npm/v/@just-web/react-image-compare.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@just-web/react-image-compare
