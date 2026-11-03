// Local fixture images for stories and tests, so they need no network.
// baseline.png and result.png are 600x400 and differ in a few shapes.
// result-small.png is 400x300, for the image-anchor stories.
import baselineDataUrl from '../../fixtures/baseline.png?inline'
import baseline from '../../fixtures/baseline.png?url'
import resultDataUrl from '../../fixtures/result.png?inline'
import result from '../../fixtures/result.png?url'
import resultSmall from '../../fixtures/result-small.png?url'

export { baseline, baselineDataUrl, result, resultDataUrl, resultSmall }

/** Waits until every image in the element has been sized and shown. */
export function imagesReady(element: HTMLElement) {
	const images = Array.from(element.querySelectorAll('img'))
	return images.length > 0 && images.every((img) => img.style.visibility !== 'hidden' && img.complete)
}
