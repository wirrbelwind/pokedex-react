import { PokemonCard } from "entities/pokemon";
import moduleStyles from './style.module.scss'
import { PokemonListProps } from "./props";
import { MouseEventHandler, useCallback, useState } from "react";
import { IElementType, useAllPokemons } from "entities/pokemon/model";
import { FilterPokemons } from "features/filter-pokemon";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import classNames from "classnames";

export const PokemonList = (props: PokemonListProps) => {
	const { className, onSelect } = props
	const containerClass = classNames(
		moduleStyles.container,
		className
	)

	// filtered pokemons
	const [element, setElement] = useState<null | IElementType>(null)
	const {
		pokemons,
		fetchMorePokemons,
		reset,
		types,
		isLoading
	} = useAllPokemons(element, setElement)

	// handler for PokemonCard
	const handleClickPokemon: MouseEventHandler = useCallback((event) => {
		if (!onSelect) return;

		const target = event.target as HTMLElement
		const pokemonCard = target.closest(`[data-pokemon-id]`) as HTMLElement;

		const id = pokemonCard?.dataset?.pokemonId
		if (!id) return;

		const selectedPokemon = pokemons.find(pok => Number(id) === pok.id)
		if (!selectedPokemon) return;

		onSelect(selectedPokemon)
	}, [pokemons])

	return (
		<div
			className={containerClass}
			onClick={handleClickPokemon}
		>
			<FilterPokemons
				pokemonTypes={types}
				selectedPokemonType={element}
				setPokemonType={setElement}
				reset={reset}
			/>

			<div className={moduleStyles.list}>
				{
					pokemons.map(pok => {
						return (<PokemonCard
							key={pok.name}
							name={pok.name}
							elements={pok.types.map(typ => typ.type.name)}
							avatarURL={pok.sprites.front_default}
							id={pok.id}
						/>)
					})
				}
			</div>

			<LoadMoreButton
				type="button"
				onClick={fetchMorePokemons}
				disabled={isLoading}
			>
				Load more
			</LoadMoreButton>
		</div>
	)
};
