import { useState } from 'react'
import { OnionSkin } from './onion-skin.tsx'
import { type ImageCompareViewProps, rootStyle, useControllableState } from './shared.tsx'
import { SideBySide } from './side-by-side.tsx'
import { Swipe } from './swipe.tsx'

export type ImageCompareMode = 'side-by-side' | 'swipe' | 'onion-skin'

export const imageCompareModes: readonly ImageCompareMode[] = ['side-by-side', 'swipe', 'onion-skin']

const modeLabels: Record<ImageCompareMode, string> = {
	'side-by-side': 'Side by side',
	swipe: 'Swipe',
	'onion-skin': 'Onion skin',
}

export interface ImageCompareProps extends ImageCompareViewProps {
	/** The view to show. Set it to control the mode. */
	mode?: ImageCompareMode | undefined
	/** Initial mode when uncontrolled. Defaults to `"side-by-side"`. */
	defaultMode?: ImageCompareMode | undefined
	/** Called when the user picks a mode in the switcher. */
	onModeChange?: ((mode: ImageCompareMode) => void) | undefined
	/** Show the row of mode buttons. Defaults to `true`. */
	showModeSwitcher?: boolean | undefined
}

/**
 * Compares two images the way GitHub's image diff does: side by side, swipe, or onion skin.
 * The swipe position and the onion skin opacity are kept when switching modes.
 */
export function ImageCompare({
	mode: modeProp,
	defaultMode = 'side-by-side',
	onModeChange,
	showModeSwitcher = true,
	className,
	style,
	...viewProps
}: ImageCompareProps) {
	const [mode, setMode] = useControllableState(modeProp, defaultMode, onModeChange)
	const [position, setPosition] = useState(50)
	const [opacity, setOpacity] = useState(50)

	return (
		<div className={className} style={{ ...rootStyle, ...style }}>
			{showModeSwitcher && (
				<div role="group" aria-label="Comparison mode" style={{ display: 'flex', gap: 0 }}>
					{imageCompareModes.map((m, i) => {
						const selected = m === mode
						return (
							<button
								key={m}
								type="button"
								aria-pressed={selected}
								onClick={() => setMode(m)}
								style={{
									font: 'inherit',
									fontSize: '0.75rem',
									lineHeight: 1.5,
									color: 'inherit',
									padding: '4px 12px',
									margin: 0,
									cursor: 'pointer',
									border: '1px solid rgba(127, 127, 127, 0.5)',
									borderLeftWidth: i === 0 ? 1 : 0,
									borderRadius: i === 0 ? '6px 0 0 6px' : i === imageCompareModes.length - 1 ? '0 6px 6px 0' : 0,
									backgroundColor: selected ? 'rgba(127, 127, 127, 0.25)' : 'transparent',
									fontWeight: selected ? 600 : 400,
								}}
							>
								{modeLabels[m]}
							</button>
						)
					})}
				</div>
			)}
			{mode === 'swipe' ? (
				<Swipe {...viewProps} position={position} onPositionChange={setPosition} />
			) : mode === 'onion-skin' ? (
				<OnionSkin {...viewProps} opacity={opacity} onOpacityChange={setOpacity} />
			) : (
				<SideBySide {...viewProps} />
			)}
		</div>
	)
}
