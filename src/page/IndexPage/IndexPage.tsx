import moduleStyle from './style.module.scss';
import { useState } from 'react'
import { PokemonTable, pokemonModel } from "entities/pokemon";
import { useMemo } from 'react';
import { PokemonList } from 'widgets/PokemonList';
import { extractStatValue } from 'entities/pokemon/model';

const IndexPage = () => {
	const [selectedPokemon, setSelectedPokemon] = useState<pokemonModel.IPokemon | null>(null)

	const extractedStats = useMemo(() => ({
		attack: extractStatValue('attack', selectedPokemon?.stats) || 0,
		hp: extractStatValue('hp', selectedPokemon?.stats) || 0,
		defense: extractStatValue('defense', selectedPokemon?.stats) || 0,
		spAttack: extractStatValue('special-attack', selectedPokemon?.stats) || 0,
		spDefense: extractStatValue('special-defense', selectedPokemon?.stats) || 0,
		speed: extractStatValue('speed', selectedPokemon?.stats) || 0,
		//merge all types to string, split them by comma and remove comma after last element
		types: selectedPokemon?.types.map(typ => typ.type.name) || []

	}), [selectedPokemon])

	return (

		<div className={moduleStyle.page}>
			<h1 className={moduleStyle.title} >Pokedex</h1>

			<main className={moduleStyle.inner}>
				<PokemonList
					className={moduleStyle['main-section']}
					onSelect={setSelectedPokemon}
				/>
				{
					selectedPokemon &&

					<PokemonTable
						className={moduleStyle['side-section']}

						id={selectedPokemon?.id}
						attack={extractedStats.attack}
						name={selectedPokemon.name}
						avatar={selectedPokemon.sprites.front_default}
						hp={extractedStats.hp}
						defense={extractedStats.defense}
						spAttack={extractedStats.spAttack}
						spDefense={extractedStats.spDefense}
						speed={extractedStats.speed}
						weight={selectedPokemon.weight}
						total_moves={selectedPokemon.moves.length}
						types={extractedStats.types}
					/>
				}
			</main>
		</div>

	);
};

export default IndexPage;