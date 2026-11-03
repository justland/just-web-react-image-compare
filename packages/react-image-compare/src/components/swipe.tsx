import { type PointerEvent, useRef, useState } from 'react'
import {
	backingStyle,
	defaultBaseLabel,
	defaultCompareLabel,
	frameStyle,
	type ImageCompareViewProps,
	imageStyle,
	labelStyle,
	layerStyle,
	onSliderKeyDown,
	rootStyle,
	useControllableState,
	useImageSizes,
} from './shared.tsx'

export interface SwipeProps extends ImageCompareViewProps {
	/** Divider position as a percentage from the left (0 to 100). Set it to control the divider. */
	position?: number | undefined
	/** Initial divider position when uncontrolled. Defaults to `50`. */
	defaultPosition?: number | undefined
	/** Called when the user moves the divider. */
	onPositionChange?: ((position: number) => void) | undefined
}

function DividerHandle({ flip }: { flip?: boolean }) {
	return (
		<svg
			aria-hidden="true"
			width="12"
			height="9"
			viewBox="0 0 16 12"
			style={{
				position: 'absolute',
				left: '50%',
				...(flip
					? { bottom: 0, transform: 'translate(-50%, 50%) rotate(180deg)' }
					: { top: 0, transform: 'translate(-50%, -50%)' }),
			}}
		>
			<polygon points="8,12 16,0 0,0" fill="#E8D5A3" stroke="gray" strokeWidth="1" />
		</svg>
	)
}

const clamp = (n: number) => Math.min(100, Math.max(0, n))

/**
 * Shows the base image left of a divider and the compare image right of it.
 * Drag anywhere on the image, or focus it and use the arrow keys, to move the divider.
 */
export function Swipe({
	base,
	compare,
	baseLabel = defaultBaseLabel,
	compareLabel = defaultCompareLabel,
	imageAnchor = 'top-left',
	compareImageBackgroundColor,
	showCheckerPattern = true,
	className,
	style,
	position: positionProp,
	defaultPosition = 50,
	onPositionChange,
}: SwipeProps) {
	const [position, setPosition] = useControllableState(positionProp, defaultPosition, onPositionChange)
	const { baseSize, compareSize, frame } = useImageSizes(base, compare)
	const [focusVisible, setFocusVisible] = useState(false)
	const dragging = useRef(false)

	// Map the pointer to the frame directly. A native range input reserves room for its thumb,
	// so its own pointer mapping drifts from the divider near the edges.
	const positionAt = (event: PointerEvent<HTMLInputElement>) => {
		const rect = event.currentTarget.getBoundingClientRect()
		if (rect.width === 0) return position
		return clamp(Math.round(((event.clientX - rect.left) / rect.width) * 1000) / 10)
	}

	return (
		<div className={className} style={{ ...rootStyle, ...style }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, maxWidth: frame?.width }}>
				<span style={labelStyle}>{baseLabel}</span>
				<span style={labelStyle}>{compareLabel}</span>
			</div>
			<div
				style={{
					...frameStyle(frame),
					outline: focusVisible ? '2px solid #0969da' : 'none',
					outlineOffset: 2,
				}}
			>
				<div style={{ ...layerStyle, ...backingStyle(showCheckerPattern, compareImageBackgroundColor) }}>
					<img src={compare} alt="" draggable={false} style={imageStyle(compareSize, frame, imageAnchor)} />
				</div>
				<div
					style={{
						...layerStyle,
						...backingStyle(showCheckerPattern),
						clipPath: `inset(0 ${100 - position}% 0 0)`,
					}}
				>
					<img src={base} alt="" draggable={false} style={imageStyle(baseSize, frame, imageAnchor)} />
				</div>
				<div
					aria-hidden="true"
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: `${position}%`,
						width: 2,
						transform: 'translateX(-50%)',
						backgroundColor: '#9ca3af',
						boxShadow: '0 0 4px rgba(0, 0, 0, 0.4)',
						pointerEvents: 'none',
						zIndex: 1,
					}}
				>
					<DividerHandle />
					<DividerHandle flip />
				</div>
				<input
					type="range"
					min={0}
					max={100}
					step="any"
					value={position}
					aria-label="Swipe position"
					aria-valuetext={`${Math.round(position)}%`}
					onChange={(event) => setPosition(clamp(Number(event.currentTarget.value)))}
					onKeyDown={onSliderKeyDown(position, setPosition)}
					onPointerDown={(event) => {
						if (event.button !== 0) return
						event.preventDefault()
						event.currentTarget.focus()
						try {
							// Keep receiving moves when the pointer leaves the image mid-drag.
							event.currentTarget.setPointerCapture(event.pointerId)
						} catch {
							// Synthetic pointers (such as in tests) have no capturable id.
						}
						dragging.current = true
						setPosition(positionAt(event))
					}}
					onPointerMove={(event) => {
						if (dragging.current) setPosition(positionAt(event))
					}}
					onPointerUp={() => {
						dragging.current = false
					}}
					onPointerCancel={() => {
						dragging.current = false
					}}
					onFocus={(event) => setFocusVisible(event.currentTarget.matches(':focus-visible'))}
					onBlur={() => setFocusVisible(false)}
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						margin: 0,
						padding: 0,
						opacity: 0,
						cursor: 'ew-resize',
						touchAction: 'none',
						appearance: 'none',
						zIndex: 2,
					}}
				/>
			</div>
		</div>
	)
}
