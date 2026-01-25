import { cva, type VariantProps } from 'class-variance-authority'
import { useCallback, useMemo, useState } from 'react'
import { Slider, SliderOutput, SliderThumb, SliderTrack } from 'react-aria-components'
import type { SliderProps } from 'react-aria-components'

const imageComparePanelVariants = cva('relative w-full h-full overflow-hidden', {
	variants: {},
	defaultVariants: {},
})

export interface ImageComparePanelProps
	extends Omit<SliderProps<number>, 'defaultValue' | 'onChange'>,
		VariantProps<typeof imageComparePanelVariants> {
	beforeImage: string | React.ReactElement
	afterImage: string | React.ReactElement
	defaultValue?: number
	onChange?: (value: number) => void
	beforeLabel?: string
	afterLabel?: string
	className?: string
}

export function ImageComparePanel({
	beforeImage,
	afterImage,
	defaultValue,
	onChange,
	beforeLabel,
	afterLabel,
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

	const beforeImageElement = useMemo(() => {
		if (typeof beforeImage === 'string') {
			return (
				<img
					src={beforeImage}
					alt={beforeLabel || 'Before'}
					className="absolute inset-0 w-full h-full object-cover"
				/>
			)
		}
		return beforeImage
	}, [beforeImage, beforeLabel])

	const afterImageElement = useMemo(() => {
		if (typeof afterImage === 'string') {
			return (
				<img
					src={afterImage}
					alt={afterLabel || 'After'}
					className="absolute inset-0 w-full h-full object-cover"
				/>
			)
		}
		return afterImage
	}, [afterImage, afterLabel])

	return (
		<div className={imageComparePanelVariants({ className })}>
			{/* Before image (background) */}
			<div className="absolute inset-0 w-full h-full">{beforeImageElement}</div>

			{/* After image (clipped) */}
			<div
				className="absolute inset-0 w-full h-full overflow-hidden"
				style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
			>
				{afterImageElement}
			</div>

			{/* Divider line */}
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-gray-400 shadow-lg z-10 pointer-events-none"
				style={{ left: `${value}%` }}
			>
				{/* Divider handle */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-2 border-gray-400 shadow-md flex items-center justify-center">
					<div className="w-2 h-2 rounded-full bg-gray-400" />
				</div>
			</div>

			{/* Slider (invisible, covers entire area) */}
			<Slider
				defaultValue={defaultValue ?? 50}
				onChange={handleChange}
				minValue={0}
				maxValue={100}
				step={1}
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
				<div className="absolute top-4 left-4 px-2 py-1 bg-black/50 text-white text-sm rounded z-20">
					{beforeLabel}
				</div>
			)}
			{afterLabel && (
				<div className="absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-sm rounded z-20">
					{afterLabel}
				</div>
			)}
		</div>
	)
}
