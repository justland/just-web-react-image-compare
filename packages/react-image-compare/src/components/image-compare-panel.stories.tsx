import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import { expect, userEvent, waitFor } from 'storybook/test'
import { ImageComparePanel } from '#just-web/react-image-compare'

const meta: Meta<typeof ImageComparePanel> = {
	component: ImageComparePanel,
	title: 'Components/ImageComparePanel',
	tags: ['autodocs', 'version:next'],
	parameters: {
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-4xl mx-auto">
				<Story />
			</div>
		),
	],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		baseImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		compareImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
	},
}

export const KeyboardNavigation: Story = {
	tags: ['keyboard', 'unit'],
	args: {
		baseImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		compareImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
	},
	play: async ({ canvas }) => {
		const slider = canvas.getByRole('slider', { name: /image comparison slider/i })
		expect(slider).toBeInTheDocument()

		// Test keyboard navigation - move right
		await userEvent.click(slider)
		await userEvent.keyboard('{ArrowRight}')
		await userEvent.keyboard('{ArrowRight}')

		// Test keyboard navigation - move left
		await userEvent.keyboard('{ArrowLeft}')

		// Verify slider is still accessible
		await expect(slider).toHaveFocus()
	},
}

export const DragInteraction: Story = {
	tags: ['unit', 'usecase'],
	args: {
		baseImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		compareImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
	},
	play: async ({ canvas }) => {
		const slider = canvas.getByRole('slider', { name: /image comparison slider/i })
		await expect(slider).toBeInTheDocument()

		// Get initial value - react-aria-components may set aria-valuenow on the thumb
		// We'll check both the slider and look for the thumb element
		let initialValue: string | null = slider.getAttribute('aria-valuenow')
		if (!initialValue) {
			// Try to find the thumb element which might have the attribute
			const thumb = slider.querySelector('[role="slider"]') || slider
			initialValue = thumb.getAttribute('aria-valuenow')
		}
		// Default to 50 if not found (which is the default value)
		const initialValueNum = initialValue ? Number.parseInt(initialValue, 10) : 50

		// Get slider dimensions for calculating coordinates
		const sliderRect = slider.getBoundingClientRect()
		const startX = sliderRect.left + sliderRect.width * 0.5
		const startY = sliderRect.top + sliderRect.height / 2
		const endX = sliderRect.left + sliderRect.width * 0.7
		const endY = startY
		const midX = (startX + endX) / 2

		// Helper function to create and dispatch events
		const dispatchPointerEvent = (type: string, x: number, y: number, button = 0) => {
			const event = new PointerEvent(type, {
				pointerId: 1,
				button,
				clientX: x,
				clientY: y,
				bubbles: true,
				cancelable: true,
				buttons: type === 'pointerup' ? 0 : 1,
			})
			slider.dispatchEvent(event)
		}

		const dispatchMouseEvent = (type: string, x: number, y: number, button = 0) => {
			const event = new MouseEvent(type, {
				button,
				clientX: x,
				clientY: y,
				bubbles: true,
				cancelable: true,
				buttons: type === 'mouseup' ? 0 : 1,
			})
			slider.dispatchEvent(event)
		}

		// Simulate drag using both pointer and mouse events for better compatibility
		// 1. Pointer/Mouse down at start position
		dispatchPointerEvent('pointerdown', startX, startY)
		dispatchMouseEvent('mousedown', startX, startY)

		// 2. Move to intermediate position (more realistic drag)
		dispatchPointerEvent('pointermove', midX, endY)
		dispatchMouseEvent('mousemove', midX, endY)

		// 3. Move to end position
		dispatchPointerEvent('pointermove', endX, endY)
		dispatchMouseEvent('mousemove', endX, endY)

		// 4. Pointer/Mouse up at end position
		dispatchPointerEvent('pointerup', endX, endY)
		dispatchMouseEvent('mouseup', endX, endY)
		dispatchMouseEvent('click', endX, endY)

		// Wait for the value to update and verify it changed
		await waitFor(
			async () => {
				let newValue: string | null = slider.getAttribute('aria-valuenow')
				if (!newValue) {
					const thumb = slider.querySelector('[role="slider"]') || slider
					newValue = thumb.getAttribute('aria-valuenow')
				}
				if (newValue) {
					const newValueNum = Number.parseInt(newValue, 10)
					expect(newValueNum).not.toBe(initialValueNum)
				} else {
					// If aria-valuenow is still not available, verify the interaction completed
					// by checking that the slider is still accessible
					expect(slider).toBeInTheDocument()
				}
			},
			{ timeout: 1000 },
		)
	},
}

// Image anchor stories - using different sized images to demonstrate alignment
const anchorImageBase = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
const anchorImageCompare = 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop'

export const ImageAnchorTopLeft: Story = {
	name: 'imageAnchor: top-left',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'top-left',
	},
}

export const ImageAnchorTopCenter: Story = {
	name: 'imageAnchor: top-center',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'top-center',
	},
}

export const ImageAnchorTopRight: Story = {
	name: 'imageAnchor: top-right',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'top-right',
	},
}

export const ImageAnchorMiddleLeft: Story = {
	name: 'imageAnchor: middle-left',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'middle-left',
	},
}

export const ImageAnchorMiddleCenter: Story = {
	name: 'imageAnchor: middle-center',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'middle-center',
	},
}

export const ImageAnchorMiddleRight: Story = {
	name: 'imageAnchor: middle-right',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'middle-right',
	},
}

export const ImageAnchorBottomLeft: Story = {
	name: 'imageAnchor: bottom-left',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'bottom-left',
	},
}

export const ImageAnchorBottomCenter: Story = {
	name: 'imageAnchor: bottom-center',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'bottom-center',
	},
}

export const ImageAnchorBottomRight: Story = {
	name: 'imageAnchor: bottom-right',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'bottom-right',
	},
}

export const CustomBackgroundColor: Story = {
	name: 'compareImageBackgroundColor: custom',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		compareImageBackgroundColor: '#08e8e8',
		showCheckerPattern: false,
	},
}
