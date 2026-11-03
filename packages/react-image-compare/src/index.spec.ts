import { expect, it } from 'vitest'
import * as index from '#just-web/react-image-compare'

it('exports the compare component and each view', () => {
	expect(Object.keys(index).sort()).toEqual(['ImageCompare', 'OnionSkin', 'SideBySide', 'Swipe', 'imageCompareModes'])
})

it('lists the modes in switcher order', () => {
	expect(index.imageCompareModes).toEqual(['side-by-side', 'swipe', 'onion-skin'])
})
