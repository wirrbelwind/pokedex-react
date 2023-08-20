import type { Meta, StoryObj } from '@storybook/react';
import { ElementList } from './ElementList';

const meta: Meta<typeof ElementList> = {
  component: ElementList,
};

export default meta;
type Story = StoryObj<typeof ElementList>;

export const Default: Story = {
  render: () => <ElementList
    list={['fire', 'dragon', 'electric']}
  />,
};