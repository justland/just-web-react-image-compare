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

export interface OnionSkinProps extends ImageCompareViewProps {
	/** Opacity of the compare image as a percentage (0 to 100). Set it to control the opacity. */
	opacity?: number | undefined
	/** Initial opacity when uncontrolled. Defaults to `50`. */
	defaultOpacity?: number | undefined
	/** Called when the user moves the opacity slider. */
	onOpacityChange?: ((opacity: number) => void) | undefined
}

/**
 * Stacks the compare image on top of the base image.
 * A slider below sets the compare image's opacity.
 */
export function OnionSkin({
	base,
	compare,
	baseLabel = defaultBaseLabel,
	compareLabel = defaultCompareLabel,
	imageAnchor = 'top-left',
	compareImageBackgroundColor,
	showCheckerPattern = true,
	className,
	style,
	opacity: opacityProp,
	defaultOpacity = 50,
	onOpacityChange,
}: OnionSkinProps) {
	const [opacity, setOpacity] = useControllableState(opacityProp, defaultOpacity, onOpacityChange)
	const { baseSize, compareSize, frame } = useImageSizes(base, compare)
	return (
		<div className={className} style={{ ...rootStyle, ...style }}>
			<div style={frameStyle(frame)}>
				<div style={{ ...layerStyle, ...backingStyle(showCheckerPattern) }}>
					<img src={base} alt="" draggable={false} style={imageStyle(baseSize, frame, imageAnchor)} />
				</div>
				<div
					style={{
						...layerStyle,
						...backingStyle(showCheckerPattern, compareImageBackgroundColor),
						opacity: opacity / 100,
					}}
				>
					<img src={compare} alt="" draggable={false} style={imageStyle(compareSize, frame, imageAnchor)} />
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 8,
					maxWidth: frame?.width,
				}}
			>
				<span style={labelStyle}>{baseLabel}</span>
				<input
					type="range"
					min={0}
					max={100}
					step={1}
					value={opacity}
					aria-label="Onion skin opacity"
					aria-valuetext={`${Math.round(opacity)}%`}
					onChange={(event) => setOpacity(Number(event.currentTarget.value))}
					onKeyDown={onSliderKeyDown(opacity, setOpacity)}
					style={{ flex: '0 1 200px', minWidth: 80, margin: 0, cursor: 'pointer' }}
				/>
				<span style={labelStyle}>{compareLabel}</span>
			</div>
		</div>
	)
}
