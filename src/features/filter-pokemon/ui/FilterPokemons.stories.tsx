import type { Meta, StoryObj } from '@storybook/react';
import { FilterPokemons } from './FilterPokemons';

const meta: Meta<typeof FilterPokemons> = {
	component: FilterPokemons,
};

export default meta;
type Story = StoryObj<typeof FilterPokemons>;

export const Default: Story = {
	render: () => <FilterPokemons
		pokemonTypes={['bug', 'dark', 'electric', 'fairy']}
		reset={() =>{}}
		setPokemonType={() => {}}
		selectedPokemonType={'dark'}
	/>,
};