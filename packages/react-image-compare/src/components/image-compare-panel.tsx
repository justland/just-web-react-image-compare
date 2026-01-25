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
	baseImage: string
	compareImage: string
	defaultValue?: number | undefined
	onChange?: ((value: number) => void) | undefined
	imageAnchor?: ImageAnchor | undefined
	compareImageBackgroundColor?: string | undefined
	showCheckerPattern?: boolean | undefined
}

export function ImageComparePanel({
	baseImage,
	compareImage,
	defaultValue,
	onChange,
	imageAnchor = 'top-left',
	compareImageBackgroundColor,
	showCheckerPattern = true,
	className,
	...sliderProps
}: ImageComparePanelProps) {
	const [value, setValue] = useState(defaultValue ?? 0)
	const [containerStyle, setContainerStyle] = useState<{ width?: number; height?: number } | undefined>(undefined)

	const handleChange = useCallback(
		(value: number) => {
			setValue(value)
			onChange?.(value)
		},
		[onChange],
	)

	useEffect(() => {
		let baseLoaded = false
		let compareLoaded = false
		let baseDimensions: { width: number; height: number } | null = null
		let compareDimensions: { width: number; height: number } | null = null

		const calculateDimensions = () => {
			if (baseLoaded && compareLoaded) {
				const maxWidth = Math.max(baseDimensions?.width ?? 0, compareDimensions?.width ?? 0)
				const maxHeight = Math.max(baseDimensions?.height ?? 0, compareDimensions?.height ?? 0)

				if (maxWidth > 0 && maxHeight > 0) {
					setContainerStyle({ width: maxWidth, height: maxHeight })
				}
			} else if (baseLoaded && baseDimensions) {
				setContainerStyle({ width: baseDimensions.width, height: baseDimensions.height })
			} else if (compareLoaded && compareDimensions) {
				setContainerStyle({ width: compareDimensions.width, height: compareDimensions.height })
			}
		}

		const baseImg = new Image()
		baseImg.onload = () => {
			baseDimensions = { width: baseImg.width, height: baseImg.height }
			baseLoaded = true
			calculateDimensions()
		}
		baseImg.onerror = () => {
			baseLoaded = true
			calculateDimensions()
		}
		baseImg.src = baseImage

		const compareImg = new Image()
		compareImg.onload = () => {
			compareDimensions = { width: compareImg.width, height: compareImg.height }
			compareLoaded = true
			calculateDimensions()
		}
		compareImg.onerror = () => {
			compareLoaded = true
			calculateDimensions()
		}
		compareImg.src = compareImage
	}, [baseImage, compareImage])

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

	const checkerBackgroundStyle = {
		backgroundImage: `
			linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
			linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
			linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
		`,
		backgroundSize: '20px 20px',
		backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
	}

	const containerStyles: React.CSSProperties = {
		...(containerStyle
			? {
					width: `${containerStyle.width}px`,
					height: `${containerStyle.height}px`,
					maxWidth: '100%',
					maxHeight: '100%',
				}
			: {}),
	}

	return (
		<div className={imageComparePanelVariants({ className })} style={containerStyles}>
			{/* Checkerboard background pattern */}
			{showCheckerPattern && <div className="absolute inset-0 w-full h-full" style={checkerBackgroundStyle} />}

			{/* Base image (background) */}
			<div className="absolute inset-0 w-full h-full overflow-hidden">
				<img src={baseImage} alt="Base" className="absolute" style={positionStyle} />
			</div>

			{/* Compare image (clipped) */}
			<div
				className="absolute inset-0 w-full h-full overflow-hidden"
				style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
			>
				{/* Background color for compare image container */}
				{compareImageBackgroundColor && (
					<div className="absolute inset-0 w-full h-full" style={{ backgroundColor: compareImageBackgroundColor }} />
				)}
				{/* Checkerboard background for compare image container */}
				{showCheckerPattern && <div className="absolute inset-0 w-full h-full" style={checkerBackgroundStyle} />}
				<img src={compareImage} alt="Compare" className="absolute" style={positionStyle} />
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
		</div>
	)
}
