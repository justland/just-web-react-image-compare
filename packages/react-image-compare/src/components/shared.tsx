import { type CSSProperties, type KeyboardEvent, type ReactNode, useCallback, useEffect, useState } from 'react'

/**
 * Where an image sits inside the comparison frame when the two images differ in size.
 */
export type ImageAnchor =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'middle-left'
	| 'middle-center'
	| 'middle-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'

/**
 * Props shared by every comparison view.
 */
export interface ImageCompareViewProps {
	/** The image to compare against, such as a baseline. Any `<img>` source works, including `data:` URLs. */
	base: string
	/** The image being compared, such as a new result. Any `<img>` source works, including `data:` URLs. */
	compare: string
	/** Label for the base image. Defaults to `"Base"`. */
	baseLabel?: ReactNode | undefined
	/** Label for the compare image. Defaults to `"Compare"`. */
	compareLabel?: ReactNode | undefined
	/** Where each image sits when the two images differ in size. Defaults to `"top-left"`. */
	imageAnchor?: ImageAnchor | undefined
	/** Background color behind the compare image. */
	compareImageBackgroundColor?: string | undefined
	/** Show a checkerboard behind the images so transparent pixels are visible. Defaults to `true`. */
	showCheckerPattern?: boolean | undefined
	className?: string | undefined
	style?: CSSProperties | undefined
}

export const defaultBaseLabel = 'Base'
export const defaultCompareLabel = 'Compare'

export interface Size {
	width: number
	height: number
}

interface Loaded {
	src: string
	size: Size | undefined
}

function useImageSize(src: string) {
	const [loaded, setLoaded] = useState<Loaded | undefined>(undefined)
	useEffect(() => {
		let active = true
		const img = new Image()
		const done = (size: Size | undefined) => {
			if (active) setLoaded({ src, size })
		}
		img.onload = () => done({ width: img.naturalWidth, height: img.naturalHeight })
		img.onerror = () => done(undefined)
		img.src = src
		return () => {
			active = false
			img.onload = null
			img.onerror = null
		}
	}, [src])
	return loaded?.src === src ? loaded.size : undefined
}

/**
 * Loads both images and returns their natural sizes,
 * plus the frame size that fits both (the max of each dimension).
 */
export function useImageSizes(base: string, compare: string) {
	const baseSize = useImageSize(base)
	const compareSize = useImageSize(compare)
	const frame =
		baseSize || compareSize
			? {
					width: Math.max(baseSize?.width ?? 0, compareSize?.width ?? 0),
					height: Math.max(baseSize?.height ?? 0, compareSize?.height ?? 0),
				}
			: undefined
	return { baseSize, compareSize, frame: frame && frame.width > 0 && frame.height > 0 ? frame : undefined }
}

/**
 * State that is controlled when `value` is defined and uncontrolled otherwise.
 */
export function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
	const [internal, setInternal] = useState(defaultValue)
	const current = value === undefined ? internal : value
	const set = useCallback(
		(next: T) => {
			if (value === undefined) setInternal(next)
			onChange?.(next)
		},
		[value, onChange],
	)
	return [current, set] as const
}

const keySteps: Record<string, number> = {
	ArrowLeft: -1,
	ArrowDown: -1,
	ArrowRight: 1,
	ArrowUp: 1,
	PageDown: -10,
	PageUp: 10,
}

/**
 * Keyboard handling for a 0 to 100 range input: arrows step by 1, Page Up/Down by 10, Home/End jump to the ends.
 * Handled here rather than left to the browser, so both sliders step the same way however they are driven.
 */
export function onSliderKeyDown(value: number, setValue: (value: number) => void) {
	return (event: KeyboardEvent<HTMLInputElement>) => {
		const step = keySteps[event.key]
		const next =
			event.key === 'Home' ? 0 : event.key === 'End' ? 100 : step === undefined ? undefined : Math.round(value) + step
		if (next === undefined) return
		event.preventDefault()
		setValue(Math.min(100, Math.max(0, next)))
	}
}

const anchorFractions: Record<ImageAnchor, [x: number, y: number]> = {
	'top-left': [0, 0],
	'top-center': [0.5, 0],
	'top-right': [1, 0],
	'middle-left': [0, 0.5],
	'middle-center': [0.5, 0.5],
	'middle-right': [1, 0.5],
	'bottom-left': [0, 1],
	'bottom-center': [0.5, 1],
	'bottom-right': [1, 1],
}

const percent = (n: number) => `${n * 100}%`

/**
 * Inline style that places an image inside the frame.
 * Sizes and offsets are percentages of the frame, so the image scales with it.
 */
export function imageStyle(size: Size | undefined, frame: Size | undefined, anchor: ImageAnchor): CSSProperties {
	const base: CSSProperties = {
		position: 'absolute',
		display: 'block',
		maxWidth: 'none',
		margin: 0,
		padding: 0,
		border: 0,
		userSelect: 'none',
		pointerEvents: 'none',
	}
	if (!size || !frame) return { ...base, top: 0, left: 0, visibility: 'hidden' }
	const [fx, fy] = anchorFractions[anchor]
	const w = size.width / frame.width
	const h = size.height / frame.height
	return { ...base, width: percent(w), height: percent(h), left: percent(fx * (1 - w)), top: percent(fy * (1 - h)) }
}

/**
 * Inline style for the box the images are drawn in.
 * It takes the full width available, up to the natural width of the larger image, and keeps its aspect ratio.
 */
export function frameStyle(frame: Size | undefined): CSSProperties {
	return {
		position: 'relative',
		boxSizing: 'border-box',
		width: '100%',
		...(frame ? { maxWidth: frame.width, aspectRatio: `${frame.width} / ${frame.height}` } : {}),
	}
}

export const layerStyle: CSSProperties = {
	position: 'absolute',
	inset: 0,
	overflow: 'hidden',
}

const checkerStyle: CSSProperties = {
	backgroundColor: '#ffffff',
	backgroundImage: [
		'linear-gradient(45deg, #e0e0e0 25%, transparent 25%)',
		'linear-gradient(-45deg, #e0e0e0 25%, transparent 25%)',
		'linear-gradient(45deg, transparent 75%, #e0e0e0 75%)',
		'linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)',
	].join(', '),
	backgroundSize: '20px 20px',
	backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
}

/**
 * The backing drawn under an image: the checkerboard, a solid color, or nothing.
 */
export function backingStyle(showCheckerPattern: boolean, backgroundColor?: string | undefined): CSSProperties {
	if (backgroundColor) return { backgroundColor }
	return showCheckerPattern ? checkerStyle : {}
}

export const labelStyle: CSSProperties = {
	fontSize: '0.75rem',
	lineHeight: 1.5,
	fontWeight: 600,
	opacity: 0.8,
}

export const rootStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
	boxSizing: 'border-box',
	width: '100%',
	fontFamily: 'inherit',
	color: 'inherit',
}
