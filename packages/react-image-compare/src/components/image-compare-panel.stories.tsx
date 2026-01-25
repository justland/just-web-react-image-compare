import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import { expect, userEvent } from 'storybook/test'
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

export const WithLabels: Story = {
	tags: ['usecase'],
	args: {
		baseImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		compareImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const KeyboardNavigation: Story = {
	tags: ['keyboard', 'unit'],
	args: {
		baseImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		compareImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
		baseLabel: 'Base',
		compareLabel: 'Compare',
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
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
	play: async ({ canvas }) => {
		const slider = canvas.getByRole('slider', { name: /image comparison slider/i })
		await expect(slider).toBeInTheDocument()

		// Get initial value
		const initialValue = slider.getAttribute('aria-valuenow')
		await expect(initialValue).toBeTruthy()

		// Simulate drag by clicking and moving
		await userEvent.click(slider)
		const sliderRect = slider.getBoundingClientRect()
		const centerX = sliderRect.left + sliderRect.width / 2
		const centerY = sliderRect.top + sliderRect.height / 2

		// Move mouse to the right
		await userEvent.pointer({
			target: slider,
			coords: { x: centerX + 100, y: centerY },
		})

		// Verify value changed
		const newValue = slider.getAttribute('aria-valuenow')
		await expect(newValue).not.toBe(initialValue)
	},
}

export const UncontrolledBehavior: Story = {
	tags: ['unit'],
	args: {
		baseImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
		compareImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop',
		defaultValue: 25,
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
	play: async ({ canvas }) => {
		const slider = canvas.getByRole('slider', { name: /image comparison slider/i })
		expect(slider).toBeInTheDocument()

		// Verify initial value is set from defaultValue
		const initialValue = slider.getAttribute('aria-valuenow')
		expect(initialValue).toBe('25')

		// Change value
		await userEvent.click(slider)
		await userEvent.keyboard('{ArrowRight}')

		// Verify value changed
		const newValue = slider.getAttribute('aria-valuenow')
		expect(newValue).not.toBe('25')
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
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorTopCenter: Story = {
	name: 'imageAnchor: top-center',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'top-center',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorTopRight: Story = {
	name: 'imageAnchor: top-right',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'top-right',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorMiddleLeft: Story = {
	name: 'imageAnchor: middle-left',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'middle-left',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorMiddleCenter: Story = {
	name: 'imageAnchor: middle-center',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'middle-center',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorMiddleRight: Story = {
	name: 'imageAnchor: middle-right',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'middle-right',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorBottomLeft: Story = {
	name: 'imageAnchor: bottom-left',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'bottom-left',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorBottomCenter: Story = {
	name: 'imageAnchor: bottom-center',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'bottom-center',
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}

export const ImageAnchorBottomRight: Story = {
	name: 'imageAnchor: bottom-right',
	tags: ['props'],
	args: {
		baseImage: anchorImageBase,
		compareImage: anchorImageCompare,
		imageAnchor: 'bottom-right',
		baseLabel: 'Base',
		compareLabel: 'Compare',
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
		baseLabel: 'Base',
		compareLabel: 'Compare',
	},
}
