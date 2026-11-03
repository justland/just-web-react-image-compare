import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { Swipe } from '#just-web/react-image-compare'
import { baseline, imagesReady, result } from '../testing/fixtures.ts'

const meta: Meta<typeof Swipe> = {
	component: Swipe,
	title: 'Components/Swipe',
	tags: ['autodocs', 'version:next'],
	parameters: { layout: 'padded' },
	args: { base: baseline, compare: result },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	play: async ({ canvas, canvasElement }) => {
		const slider = canvas.getByRole('slider', { name: 'Swipe position' })
		await expect(slider).toHaveValue('50')
		await waitFor(() => expect(imagesReady(canvasElement)).toBe(true))
	},
}

export const KeyboardNavigation: Story = {
	tags: ['keyboard', 'unit'],
	args: { onPositionChange: fn() },
	play: async ({ args, canvas }) => {
		const slider = canvas.getByRole('slider', { name: 'Swipe position' })
		await userEvent.tab()
		await expect(slider).toHaveFocus()

		await userEvent.keyboard('{ArrowRight}{ArrowRight}')
		await expect(slider).toHaveValue('52')
		await userEvent.keyboard('{ArrowLeft}')
		await expect(slider).toHaveValue('51')
		await userEvent.keyboard('{PageUp}')
		await expect(slider).toHaveValue('61')
		await userEvent.keyboard('{Home}')
		await expect(slider).toHaveValue('0')
		await userEvent.keyboard('{End}')
		await expect(slider).toHaveValue('100')
		await expect(args.onPositionChange).toHaveBeenLastCalledWith(100)
	},
}

export const DragInteraction: Story = {
	tags: ['unit', 'usecase'],
	play: async ({ canvas }) => {
		const slider = canvas.getByRole('slider', { name: 'Swipe position' })
		const rect = slider.getBoundingClientRect()
		const y = rect.top + rect.height / 2
		await userEvent.pointer([
			{ keys: '[MouseLeft>]', target: slider, coords: { clientX: rect.left + rect.width * 0.5, clientY: y } },
			{ target: slider, coords: { clientX: rect.left + rect.width * 0.25, clientY: y } },
			{ keys: '[/MouseLeft]', target: slider, coords: { clientX: rect.left + rect.width * 0.25, clientY: y } },
		])
		await expect(Number((slider as HTMLInputElement).value)).toBeCloseTo(25, 0)
	},
}

export const Controlled: Story = {
	tags: ['props'],
	name: 'position: controlled',
	args: { position: 30, onPositionChange: fn() },
	play: async ({ args, canvas }) => {
		const slider = canvas.getByRole('slider', { name: 'Swipe position' })
		await userEvent.tab()
		await userEvent.keyboard('{ArrowRight}')
		await expect(args.onPositionChange).toHaveBeenCalledWith(31)
		// Controlled: the value stays where the parent put it.
		await expect(slider).toHaveValue('30')
	},
}

export const CustomLabels: Story = {
	tags: ['props'],
	name: 'baseLabel and compareLabel',
	args: { baseLabel: 'Baseline', compareLabel: 'Result' },
	play: async ({ canvas }) => {
		await expect(canvas.getByText('Baseline')).toBeVisible()
		await expect(canvas.getByText('Result')).toBeVisible()
	},
}
