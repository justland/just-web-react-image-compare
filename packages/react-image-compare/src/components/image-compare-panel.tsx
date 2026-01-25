import { cva, type VariantProps } from 'class-variance-authority'
import { useCallback, useEffect, useState } from 'react'
import type { SliderProps } from 'react-aria-components'
import { Slider, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components'

const imageComparePanelVariants = cva('relative w-full', {
	variants: {},
	defaultVariants: {},
})

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

function DividerHandle({ className }: { className?: string }) {
	return (
		<svg className={className} width="12" height="9" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
			<polygon points="8,12 16,0 0,0" fill="#E8D5A3" stroke="gray" strokeWidth="1" />
		</svg>
	)
}

export interface ImageComparePanelProps
	extends Omit<SliderProps<number>, 'defaultValue' | 'onChange'>,
		VariantProps<typeof imageComparePanelVariants> {
	beforeImage: string
	afterImage: string
	defaultValue?: number | undefined
	onChange?: ((value: number) => void) | undefined
	beforeLabel?: string | undefined
	afterLabel?: string | undefined
	imageAnchor?: ImageAnchor | undefined
}

export function ImageComparePanel({
	beforeImage,
	afterImage,
	defaultValue,
	onChange,
	beforeLabel,
	afterLabel,
	imageAnchor = 'top-left',
	className,
	...sliderProps
}: ImageComparePanelProps) {
	const [value, setValue] = useState(defaultValue ?? 50)
	const [containerStyle, setContainerStyle] = useState<{ width?: number; height?: number } | undefined>(undefined)

	const handleChange = useCallback(
		(value: number) => {
			setValue(value)
			onChange?.(value)
		},
		[onChange],
	)

	useEffect(() => {
		let beforeLoaded = false
		let afterLoaded = false
		let beforeDimensions: { width: number; height: number } | null = null
		let afterDimensions: { width: number; height: number } | null = null

		const calculateDimensions = () => {
			if (beforeLoaded && afterLoaded) {
				const maxWidth = Math.max(beforeDimensions?.width ?? 0, afterDimensions?.width ?? 0)
				const maxHeight = Math.max(beforeDimensions?.height ?? 0, afterDimensions?.height ?? 0)

				if (maxWidth > 0 && maxHeight > 0) {
					setContainerStyle({ width: maxWidth, height: maxHeight })
				}
			} else if (beforeLoaded && beforeDimensions) {
				setContainerStyle({ width: beforeDimensions.width, height: beforeDimensions.height })
			} else if (afterLoaded && afterDimensions) {
				setContainerStyle({ width: afterDimensions.width, height: afterDimensions.height })
			}
		}

		const beforeImg = new Image()
		beforeImg.onload = () => {
			beforeDimensions = { width: beforeImg.width, height: beforeImg.height }
			beforeLoaded = true
			calculateDimensions()
		}
		beforeImg.onerror = () => {
			beforeLoaded = true
			calculateDimensions()
		}
		beforeImg.src = beforeImage

		const afterImg = new Image()
		afterImg.onload = () => {
			afterDimensions = { width: afterImg.width, height: afterImg.height }
			afterLoaded = true
			calculateDimensions()
		}
		afterImg.onerror = () => {
			afterLoaded = true
			calculateDimensions()
		}
		afterImg.src = afterImage
	}, [beforeImage, afterImage])

	const getImagePositionStyle = (anchor: ImageAnchor): React.CSSProperties => {
		const positionMap: Record<ImageAnchor, React.CSSProperties> = {
			'top-left': { top: 0, left: 0 },
			'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
			'top-right': { top: 0, right: 0 },
			'middle-left': { top: '50%', left: 0, transform: 'translateY(-50%)' },
			'middle-center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
			'middle-right': { top: '50%', right: 0, transform: 'translateY(-50%)' },
			'bottom-left': { bottom: 0, left: 0 },
			'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
			'bottom-right': { bottom: 0, right: 0 },
		}
		return positionMap[anchor]
	}

	const positionStyle = getImagePositionStyle(imageAnchor)

	return (
		<div
			className={imageComparePanelVariants({ className })}
			style={
				containerStyle
					? {
							width: `${containerStyle.width}px`,
							height: `${containerStyle.height}px`,
							maxWidth: '100%',
							maxHeight: '100%',
						}
					: undefined
			}
		>
			{/* Checkerboard background pattern */}
			<div
				className="absolute inset-0 w-full h-full"
				style={{
					backgroundImage: `
						linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
						linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
						linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
						linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
					`,
					backgroundSize: '20px 20px',
					backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
				}}
			/>

			{/* Before image (background) */}
			<div className="absolute inset-0 w-full h-full overflow-hidden">
				<img src={beforeImage} alt={beforeLabel || 'Before'} className="absolute" style={positionStyle} />
			</div>

			{/* After image (clipped) */}
			<div
				className="absolute inset-0 w-full h-full overflow-hidden"
				style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
			>
				{/* Checkerboard background for after image container */}
				<div
					className="absolute inset-0 w-full h-full"
					style={{
						backgroundImage: `
							linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
							linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
							linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
							linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
						`,
						backgroundSize: '20px 20px',
						backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
					}}
				/>
				<img src={afterImage} alt={afterLabel || 'After'} className="absolute" style={positionStyle} />
			</div>

			{/* Divider line */}
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-gray-400 shadow-lg z-10 pointer-events-none"
				style={{ left: `${value}%` }}
			>
				{/* Divider handle - top */}
				<DividerHandle className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
				{/* Divider handle - bottom */}
				<DividerHandle className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-180" />
			</div>

			{/* Slider (invisible, covers entire area) */}
			<Slider
				defaultValue={defaultValue ?? 50}
				onChange={handleChange}
				minValue={0}
				maxValue={100}
				step={0.5}
				aria-label="Image comparison slider"
				className="absolute inset-0 w-full h-full cursor-ew-resize z-20"
				{...sliderProps}
			>
				<SliderTrack className="absolute inset-0 w-full h-full">
					<SliderThumb className="absolute top-1/2 -translate-y-1/2 w-full h-full cursor-ew-resize" />
				</SliderTrack>
				<SliderOutput className="sr-only" />
			</Slider>

			{/* Labels */}
			{beforeLabel && (
				<div className="absolute top-4 left-4 px-2 py-1 bg-black/50 text-white text-sm rounded z-20">{beforeLabel}</div>
			)}
			{afterLabel && (
				<div className="absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-sm rounded z-20">{afterLabel}</div>
			)}
		</div>
	)
}
