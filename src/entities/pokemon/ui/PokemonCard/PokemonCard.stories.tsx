import type { Meta, StoryObj } from '@storybook/react';
import { PokemonCard } from './PokemonCard';
import defaultAvatar from 'shared/assets/images/pokemon-ball.png'

const meta: Meta<typeof PokemonCard> = {
  component: PokemonCard,
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Contained: Story = {
  render: () => (
    <div style={{
      width: '300px'
    }}>
      <PokemonCard
        name='Pikachu'
        elements={['bug', 'dark', 'fire']}
        id={1}
        avatarURL={defaultAvatar}
      />
    </div>
  )
};
export const FullSize: Story = {
  render: () =>
    <PokemonCard
      name='Pikachu'
      elements={['bug', 'dark', 'fire']}
      id={1}
      avatarURL={defaultAvatar}
    />
};