import type { Meta, StoryObj } from '@storybook/react';
import { LoadMoreButton } from './LoadMoreButton';

const meta: Meta<typeof LoadMoreButton> = {
	component: LoadMoreButton,
};

export default meta;
type Story = StoryObj<typeof LoadMoreButton>;

export const FullWidth: Story = {
	name: 'Full width',
	render: () => (<LoadMoreButton>
		Load more
	</LoadMoreButton>)
};

export const Contained: Story = {
	name: 'Container',
	render: () => (<div style={{width: '300px'}}>
		<LoadMoreButton>
			Load more
		</LoadMoreButton>
	</div>)
};