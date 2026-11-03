---
'@just-web/react-image-compare': patch
---

Compile with the classic JSX runtime so the component works inside Storybook manager addons. The build no longer imports `react/jsx-runtime`, which the manager does not share.
