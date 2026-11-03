import type { CSSProperties, ReactNode } from 'react'
import {
	backingStyle,
	defaultBaseLabel,
	defaultCompareLabel,
	frameStyle,
	type ImageAnchor,
	type ImageCompareViewProps,
	imageStyle,
	labelStyle,
	layerStyle,
	type Size,
	useImageSizes,
} from './shared.tsx'

export interface SideBySideProps extends ImageCompareViewProps {}

interface PanelProps {
	label: ReactNode
	src: string
	size: Size | undefined
	frame: Size | undefined
	anchor: ImageAnchor
	backing: CSSProperties
}

function Panel({ label, src, size, frame, anchor, backing }: PanelProps) {
	return (
		<figure
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 8,
				flex: '1 1 240px',
				minWidth: 0,
				maxWidth: frame?.width,
				margin: 0,
			}}
		>
			<figcaption style={labelStyle}>{label}</figcaption>
			<div style={frameStyle(frame)}>
				<div style={{ ...layerStyle, ...backing }}>
					<img src={src} alt="" draggable={false} style={imageStyle(size, frame, anchor)} />
				</div>
			</div>
		</figure>
	)
}

/**
 * Shows the two images next to each other, each with its label.
 * The two panels share one frame size, and wrap into a column when the space is narrow.
 */
export function SideBySide({
	base,
	compare,
	baseLabel = defaultBaseLabel,
	compareLabel = defaultCompareLabel,
	imageAnchor = 'top-left',
	compareImageBackgroundColor,
	showCheckerPattern = true,
	className,
	style,
}: SideBySideProps) {
	const { baseSize, compareSize, frame } = useImageSizes(base, compare)
	return (
		<div
			className={className}
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 16,
				boxSizing: 'border-box',
				width: '100%',
				...style,
			}}
		>
			<Panel
				label={baseLabel}
				src={base}
				size={baseSize}
				frame={frame}
				anchor={imageAnchor}
				backing={backingStyle(showCheckerPattern)}
			/>
			<Panel
				label={compareLabel}
				src={compare}
				size={compareSize}
				frame={frame}
				anchor={imageAnchor}
				backing={backingStyle(showCheckerPattern, compareImageBackgroundColor)}
			/>
		</div>
	)
}
