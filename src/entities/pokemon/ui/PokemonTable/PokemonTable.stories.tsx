import type { Meta, StoryObj } from '@storybook/react';
import defaultAvatar from 'shared/assets/images/pokemon-ball.png'
import { PokemonTable } from './PokemonTable';

const meta: Meta<typeof PokemonTable> = {
	component: PokemonTable,
};

export default meta;
type Story = StoryObj<typeof PokemonTable>;

export const FullWidth: Story = {
	name: 'Full width',
	render: () => <PokemonTable
		name='Pikachu'
		attack={1}
		defense={2}
		hp={3}
		spAttack={4}
		spDefense={5}
		speed={6}
		total_moves={6}
		types={['bug', 'electric']}
		id={1}
		avatar={defaultAvatar}
		weight={7}
	/>,
};
export const Container: Story = {
	name: 'Contained',
	render: () => (<div style={{width: '300px'}}>
		<PokemonTable
		name='Pikachu'
		attack={1}
		defense={2}
		hp={3}
		spAttack={4}
		spDefense={5}
		speed={6}
		total_moves={6}
		types={['bug', 'electric']}
		id={1}
		avatar={defaultAvatar}
		weight={7}
	/>
	</div>),
};