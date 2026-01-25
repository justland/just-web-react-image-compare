import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { ImageComparePanel } from '#just-web/react-image-compare'

const meta: Meta<typeof ImageComparePanel> = {
	component: ImageComparePanel,
	title: 'Components/ImageComparePanel',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-4xl mx-auto" style={{ height: '600px' }}>
				<Story />
			</div>
		),
	],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		afterImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		defaultValue: 50,
	},
}

export const WithLabels: Story = {
	args: {
		beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		afterImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		beforeLabel: 'Before',
		afterLabel: 'After',
		defaultValue: 50,
	},
}

export const Controlled: Story = {
	args: {
		beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		afterImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		value: 30,
		beforeLabel: 'Before',
		afterLabel: 'After',
	},
	render: (args) => {
		// This story demonstrates controlled usage
		// In a real app, you'd manage state with useState
		return <ImageComparePanel {...args} />
	},
}

export const WithReactElements: Story = {
	args: {
		beforeImage: (
			<div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
				Before
			</div>
		),
		afterImage: (
			<div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
				After
			</div>
		),
		defaultValue: 50,
		beforeLabel: 'Before',
		afterLabel: 'After',
	},
}

export const KeyboardNavigation: Story = {
	args: {
		beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		afterImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		defaultValue: 50,
		beforeLabel: 'Before',
		afterLabel: 'After',
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
		expect(slider).toHaveFocus()
	},
}

export const DragInteraction: Story = {
	args: {
		beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		afterImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		defaultValue: 50,
		beforeLabel: 'Before',
		afterLabel: 'After',
	},
	play: async ({ canvas }) => {
		const slider = canvas.getByRole('slider', { name: /image comparison slider/i })
		expect(slider).toBeInTheDocument()

		// Get initial value
		const initialValue = slider.getAttribute('aria-valuenow')
		expect(initialValue).toBeTruthy()

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
		expect(newValue).not.toBe(initialValue)
	},
}

export const UncontrolledBehavior: Story = {
	args: {
		beforeImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
		afterImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
		defaultValue: 25,
		beforeLabel: 'Before',
		afterLabel: 'After',
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
