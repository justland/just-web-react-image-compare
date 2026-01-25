import { cva, type VariantProps } from 'class-variance-authority'
import { useCallback, useEffect, useMemo, useState } from 'react'
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

const imageAnchorToObjectPosition: Record<ImageAnchor, string> = {
	'top-left': 'top left',
	'top-center': 'top center',
	'top-right': 'top right',
	'middle-left': 'center left',
	'middle-center': 'center center',
	'middle-right': 'center right',
	'bottom-left': 'bottom left',
	'bottom-center': 'bottom center',
	'bottom-right': 'bottom right',
}

function DividerHandle({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width="12"
			height="9"
			viewBox="0 0 16 12"
			xmlns="http://www.w3.org/2000/svg"
		>
			<polygon
				points="8,12 16,0 0,0"
				fill="#E8D5A3"
				stroke="gray"
				strokeWidth="1"
			/>
		</svg>
	)
}

export interface ImageComparePanelProps
	extends Omit<SliderProps<number>, 'defaultValue' | 'onChange'>,
		VariantProps<typeof imageComparePanelVariants> {
	beforeImage: string | React.ReactElement
	afterImage: string | React.ReactElement
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
	const [containerStyle, setContainerStyle] = useState<{ aspectRatio?: string } | undefined>(undefined)

	const handleChange = useCallback(
		(value: number) => {
			setValue(value)
			onChange?.(value)
		},
		[onChange],
	)

	const objectPosition = imageAnchorToObjectPosition[imageAnchor]

	// Calculate aspect ratio from the maximum width and height of both images
	useEffect(() => {
		const beforeImageUrl = typeof beforeImage === 'string' ? beforeImage : null
		const afterImageUrl = typeof afterImage === 'string' ? afterImage : null
		
		if (!beforeImageUrl && !afterImageUrl) {
			// For React elements, we can't easily get dimensions, so use a default
			setContainerStyle({ aspectRatio: `${16 / 9}` })
			return
		}

		let beforeLoaded = false
		let afterLoaded = false
		let beforeDimensions: { width: number; height: number } | null = null
		let afterDimensions: { width: number; height: number } | null = null

		const calculateAspectRatio = () => {
			if (beforeLoaded && afterLoaded) {
				const maxWidth = Math.max(
					beforeDimensions?.width ?? 0,
					afterDimensions?.width ?? 0
				)
				const maxHeight = Math.max(
					beforeDimensions?.height ?? 0,
					afterDimensions?.height ?? 0
				)
				
				if (maxWidth > 0 && maxHeight > 0) {
					setContainerStyle({ aspectRatio: `${maxWidth / maxHeight}` })
				}
			} else if (beforeLoaded && beforeDimensions) {
				setContainerStyle({ aspectRatio: `${beforeDimensions.width / beforeDimensions.height}` })
			} else if (afterLoaded && afterDimensions) {
				setContainerStyle({ aspectRatio: `${afterDimensions.width / afterDimensions.height}` })
			}
		}

		if (beforeImageUrl) {
			const beforeImg = new Image()
			beforeImg.onload = () => {
				beforeDimensions = { width: beforeImg.width, height: beforeImg.height }
				beforeLoaded = true
				calculateAspectRatio()
			}
			beforeImg.onerror = () => {
				beforeLoaded = true
				calculateAspectRatio()
			}
			beforeImg.src = beforeImageUrl
		} else {
			beforeLoaded = true
		}

		if (afterImageUrl) {
			const afterImg = new Image()
			afterImg.onload = () => {
				afterDimensions = { width: afterImg.width, height: afterImg.height }
				afterLoaded = true
				calculateAspectRatio()
			}
			afterImg.onerror = () => {
				afterLoaded = true
				calculateAspectRatio()
			}
			afterImg.src = afterImageUrl
		} else {
			afterLoaded = true
		}
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

	const beforeImageElement = useMemo(() => {
		if (typeof beforeImage === 'string') {
			return (
				<img 
					src={beforeImage} 
					alt={beforeLabel || 'Before'} 
					className="absolute" 
					style={{ 
						...positionStyle,
					}}
				/>
			)
		}
		return beforeImage
	}, [beforeImage, beforeLabel, positionStyle])

	const afterImageElement = useMemo(() => {
		if (typeof afterImage === 'string') {
			return (
				<img 
					src={afterImage} 
					alt={afterLabel || 'After'} 
					className="absolute" 
					style={{ 
						...positionStyle,
					}}
				/>
			)
		}
		return afterImage
	}, [afterImage, afterLabel, positionStyle])

	return (
		<div 
			className={imageComparePanelVariants({ className })}
			style={containerStyle}
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
			<div className="absolute inset-0 w-full h-full overflow-hidden">{beforeImageElement}</div>

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
				{afterImageElement}
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
