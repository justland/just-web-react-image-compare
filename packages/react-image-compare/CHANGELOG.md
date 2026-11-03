# @just-web/react-image-compare

## 0.1.0

### Minor Changes

- 32b4926: First release. `ImageCompare` compares two images the way GitHub's image diff does, with a switcher between three modes: side by side, swipe, and onion skin. `SideBySide`, `Swipe`, and `OnionSkin` are also exported on their own.
  
  The components use inline styles and native range inputs, with `react` and `react-dom` as peer dependencies, so they need no CSS file and render inside the Storybook manager.
