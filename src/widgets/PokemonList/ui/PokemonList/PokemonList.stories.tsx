import type { Meta, StoryObj } from '@storybook/react';
import { PokemonList } from './PokemonList';

const meta: Meta<typeof PokemonList> = {
	component: PokemonList,
};

export default meta;
type Story = StoryObj<typeof PokemonList>;

export const FullWidth: Story = {
	name: 'Full width',
	render: () => (<PokemonList />)
};

export const Contained: Story = {
	name: 'Contained',
	render: () => (<div style={{ maxWidth: '1024px', margin: '0 auto' }}>
		<PokemonList />
	</div>)
};
