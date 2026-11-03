import type { Meta, StoryObj } from '@repobuddy/storybook/storybook-addon-tag-badges'
import React from 'react'
import { expect, waitFor } from 'storybook/test'
import { SideBySide } from '#just-web/react-image-compare'
import { baseline, imagesReady, result } from '../testing/fixtures.ts'

const meta: Meta<typeof SideBySide> = {
	component: SideBySide,
	title: 'Components/SideBySide',
	tags: ['autodocs', 'version:next'],
	parameters: { layout: 'padded' },
	args: { base: baseline, compare: result },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	play: async ({ canvas, canvasElement }) => {
		await expect(canvas.getByText('Base')).toBeVisible()
		await expect(canvas.getByText('Compare')).toBeVisible()
		await waitFor(() => expect(imagesReady(canvasElement)).toBe(true))
	},
}

export const Narrow: Story = {
	tags: ['usecase'],
	name: 'Wraps when narrow',
	decorators: [
		(Story) => (
			<div style={{ width: 320 }}>
				<Story />
			</div>
		),
	],
	play: async ({ canvasElement }) => {
		const [first, second] = Array.from(canvasElement.querySelectorAll('figure'))
		await expect(second!.getBoundingClientRect().top).toBeGreaterThan(first!.getBoundingClientRect().bottom - 1)
	},
}
