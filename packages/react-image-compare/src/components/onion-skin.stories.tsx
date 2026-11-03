import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { OnionSkin } from '#just-web/react-image-compare'
import { baseline, imagesReady, result } from '../testing/fixtures.ts'

const meta: Meta<typeof OnionSkin> = {
	component: OnionSkin,
	title: 'Components/OnionSkin',
	tags: ['autodocs', 'version:next'],
	parameters: { layout: 'padded' },
	args: { base: baseline, compare: result },
}

export default meta

type Story = StoryObj<typeof meta>

const compareLayer = (canvasElement: HTMLElement) =>
	canvasElement.querySelector<HTMLImageElement>(`img[src="${result}"]`)?.parentElement

export const Default: Story = {
	play: async ({ canvas, canvasElement }) => {
		await expect(canvas.getByRole('slider', { name: 'Onion skin opacity' })).toHaveValue('50')
		await expect(compareLayer(canvasElement)).toHaveStyle({ opacity: '0.5' })
		await waitFor(() => expect(imagesReady(canvasElement)).toBe(true))
	},
}

export const KeyboardNavigation: Story = {
	tags: ['keyboard', 'unit'],
	args: { onOpacityChange: fn() },
	play: async ({ args, canvas, canvasElement }) => {
		const slider = canvas.getByRole('slider', { name: 'Onion skin opacity' })
		await userEvent.tab()
		await expect(slider).toHaveFocus()
		await userEvent.keyboard('{ArrowRight}')
		await expect(slider).toHaveValue('51')
		await expect(args.onOpacityChange).toHaveBeenLastCalledWith(51)
		await userEvent.keyboard('{End}')
		await expect(slider).toHaveValue('100')
		await expect(compareLayer(canvasElement)).toHaveStyle({ opacity: '1' })
		await userEvent.keyboard('{Home}')
		await expect(compareLayer(canvasElement)).toHaveStyle({ opacity: '0' })
	},
}

export const DefaultOpacity: Story = {
	tags: ['props'],
	name: 'defaultOpacity',
	args: { defaultOpacity: 80 },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('slider', { name: 'Onion skin opacity' })).toHaveValue('80')
	},
}
