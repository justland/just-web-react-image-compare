import { cva, type VariantProps } from 'class-variance-authority'
import { useCallback, useMemo, useState } from 'react'
import type { SliderProps } from 'react-aria-components'
import { Slider, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components'

const imageComparePanelVariants = cva('relative w-full h-full overflow-hidden', {
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

	const handleChange = useCallback(
		(value: number) => {
			setValue(value)
			onChange?.(value)
		},
		[onChange],
	)

	const objectPosition = imageAnchorToObjectPosition[imageAnchor]

	const beforeImageElement = useMemo(() => {
		if (typeof beforeImage === 'string') {
			return (
				<img 
					src={beforeImage} 
					alt={beforeLabel || 'Before'} 
					className="absolute inset-0 w-full h-full object-contain" 
					style={{ objectPosition }}
				/>
			)
		}
		return beforeImage
	}, [beforeImage, beforeLabel, objectPosition])

	const afterImageElement = useMemo(() => {
		if (typeof afterImage === 'string') {
			return (
				<img 
					src={afterImage} 
					alt={afterLabel || 'After'} 
					className="absolute inset-0 w-full h-full object-contain" 
					style={{ objectPosition }}
				/>
			)
		}
		return afterImage
	}, [afterImage, afterLabel, objectPosition])

	return (
		<div className={imageComparePanelVariants({ className })}>
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
			<div className="absolute inset-0 w-full h-full">{beforeImageElement}</div>

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
				<div
					className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
					style={{
						width: 0,
						height: 0,
						borderLeft: '8px solid transparent',
						borderRight: '8px solid transparent',
						borderTop: '12px solid yellow',
						filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
					}}
				/>
				{/* Divider handle - bottom */}
				<div
					className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
					style={{
						width: 0,
						height: 0,
						borderLeft: '8px solid transparent',
						borderRight: '8px solid transparent',
						borderBottom: '12px solid yellow',
						filter: 'drop-shadow(0 -2px 8px rgba(0, 0, 0, 0.4)) drop-shadow(0 -4px 12px rgba(0, 0, 0, 0.3))',
					}}
				/>
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
