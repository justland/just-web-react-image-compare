import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import { expect, fn, userEvent, waitFor } from 'storybook/test'
import { type ImageAnchor, ImageCompare } from '#just-web/react-image-compare'
import { baseline, baselineDataUrl, imagesReady, result, resultDataUrl, resultSmall } from '../testing/fixtures.ts'

const meta: Meta<typeof ImageCompare> = {
	component: ImageCompare,
	title: 'Components/ImageCompare',
	tags: ['autodocs', 'version:next'],
	parameters: { layout: 'padded' },
	args: { base: baseline, compare: result },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('button', { name: 'Side by side' })).toHaveAttribute('aria-pressed', 'true')
		await expect(canvas.getByText('Base')).toBeVisible()
		await expect(canvas.queryByRole('slider')).toBeNull()
	},
}

export const ModeSwitcher: Story = {
	tags: ['unit', 'usecase'],
	args: { onModeChange: fn() },
	play: async ({ args, canvas }) => {
		await userEvent.click(canvas.getByRole('button', { name: 'Swipe' }))
		await expect(args.onModeChange).toHaveBeenLastCalledWith('swipe')
		await expect(canvas.getByRole('button', { name: 'Swipe' })).toHaveAttribute('aria-pressed', 'true')
		const swipe = canvas.getByRole('slider', { name: 'Swipe position' })

		// The swipe position survives a round trip through the other modes.
		swipe.focus()
		await userEvent.keyboard('{ArrowRight}')
		await expect(swipe).toHaveValue('51')

		await userEvent.click(canvas.getByRole('button', { name: 'Onion skin' }))
		await expect(args.onModeChange).toHaveBeenLastCalledWith('onion-skin')
		await expect(canvas.getByRole('slider', { name: 'Onion skin opacity' })).toBeVisible()

		await userEvent.click(canvas.getByRole('button', { name: 'Swipe' }))
		await expect(canvas.getByRole('slider', { name: 'Swipe position' })).toHaveValue('51')
	},
}

export const ControlledMode: Story = {
	tags: ['props'],
	name: 'mode: controlled',
	args: { mode: 'onion-skin', onModeChange: fn() },
	play: async ({ args, canvas }) => {
		await userEvent.click(canvas.getByRole('button', { name: 'Swipe' }))
		await expect(args.onModeChange).toHaveBeenCalledWith('swipe')
		// The parent did not change `mode`, so the view stays on onion skin.
		await expect(canvas.getByRole('button', { name: 'Onion skin' })).toHaveAttribute('aria-pressed', 'true')
		await expect(canvas.getByRole('slider', { name: 'Onion skin opacity' })).toBeVisible()
	},
}

export const DefaultMode: Story = {
	tags: ['props'],
	name: 'defaultMode: swipe',
	args: { defaultMode: 'swipe' },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole('slider', { name: 'Swipe position' })).toBeInTheDocument()
	},
}

export const WithoutModeSwitcher: Story = {
	tags: ['props'],
	name: 'showModeSwitcher: false',
	args: { showModeSwitcher: false, defaultMode: 'swipe' },
	play: async ({ canvas }) => {
		await expect(canvas.queryByRole('button')).toBeNull()
	},
}

export const DataUrls: Story = {
	tags: ['usecase'],
	name: 'data: URLs (vis panel)',
	args: { base: baselineDataUrl, compare: resultDataUrl, baseLabel: 'Baseline', compareLabel: 'Result' },
	play: async ({ canvasElement }) => {
		await expect(baselineDataUrl.startsWith('data:image/png;base64,')).toBe(true)
		await waitFor(() => expect(imagesReady(canvasElement)).toBe(true))
		const frame = canvasElement.querySelector('img')!.parentElement!.parentElement!
		await expect(frame.style.aspectRatio).toBe('600 / 400')
	},
}

function anchorStory(imageAnchor: ImageAnchor): Story {
	return {
		name: `imageAnchor: ${imageAnchor}`,
		tags: ['props'],
		args: { compare: resultSmall, imageAnchor, defaultMode: 'onion-skin' },
	}
}

export const ImageAnchorTopLeft = anchorStory('top-left')
export const ImageAnchorTopCenter = anchorStory('top-center')
export const ImageAnchorTopRight = anchorStory('top-right')
export const ImageAnchorMiddleLeft = anchorStory('middle-left')
export const ImageAnchorMiddleCenter = anchorStory('middle-center')
export const ImageAnchorMiddleRight = anchorStory('middle-right')
export const ImageAnchorBottomLeft = anchorStory('bottom-left')
export const ImageAnchorBottomCenter = anchorStory('bottom-center')
export const ImageAnchorBottomRight: Story = {
	...anchorStory('bottom-right'),
	play: async ({ canvasElement }) => {
		// 400x300 inside a 600x400 frame: it sits a third in from the left and a quarter down.
		await waitFor(() => expect(imagesReady(canvasElement)).toBe(true))
		const small = canvasElement.querySelector<HTMLImageElement>(`img[src="${resultSmall}"]`)!
		await expect(Number.parseFloat(small.style.left)).toBeCloseTo(100 / 3, 3)
		await expect(Number.parseFloat(small.style.top)).toBeCloseTo(25, 3)
		await expect(Number.parseFloat(small.style.width)).toBeCloseTo(200 / 3, 3)
	},
}

export const CustomBackgroundColor: Story = {
	name: 'compareImageBackgroundColor: custom',
	tags: ['props'],
	args: {
		compare: resultSmall,
		compareImageBackgroundColor: '#08e8e8',
		showCheckerPattern: false,
		defaultMode: 'swipe',
	},
}
