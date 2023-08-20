import { PokemonCard } from "entities/pokemon";
import moduleStyles from './style.module.scss'
import { PokemonListProps } from "./props";
import { MouseEventHandler, useCallback, useState } from "react";
import { IElementType, usePokemons, usePokemonsByType } from "entities/pokemon/model";
import { FilterPokemons } from "features/filter-pokemon";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import classNames from "classnames";

export const PokemonList = (props: PokemonListProps) => {
	const { className, onSelect } = props
	const containerClass = classNames(
		moduleStyles.container,
		className
	)

	// all pokemons
	const {
		fetchMorePokemons: fetchMorePokemons,
		pokemons: regularPokemons,
	} = usePokemons()

	// filtered pokemons
	const [element, setElement] = useState<null | IElementType>(null)
	const {
		fetchMorePokemons: fetchMorePokemonsType,
		pokemonTypes,
		pokemons: filteredPokemons,
		reset
	} = usePokemonsByType(element, setElement)

	console.log('filteredPokemons', filteredPokemons);
	console.log('--------');
	
	console.log('regularPokemons', regularPokemons);
	

	// handler for PokemonCard
	const handleClickPokemon: MouseEventHandler = useCallback((event) => {
		if (!onSelect) return;

		const target = event.target as HTMLElement
		const pokemonCard = target.closest(`[data-pokemon-id]`) as HTMLElement;

		const id = pokemonCard?.dataset?.pokemonId
		if (!id) return;

		const allPokemons = regularPokemons.concat(filteredPokemons)
		const selectedPokemon = allPokemons.find(pokemon => Number(id) === pokemon.id)
		if (!selectedPokemon) return;

		onSelect(selectedPokemon)
	}, [regularPokemons, filteredPokemons])

	// will be used as props
	const currentListType = filteredPokemons.length > 0 ? 'filtered' : 'all'
	const currentList = currentListType === 'filtered' ? filteredPokemons : regularPokemons
	const handlerLoadMore = currentListType === 'filtered' ? fetchMorePokemonsType : fetchMorePokemons;

	return (
		<div
			className={containerClass}
			onClick={handleClickPokemon}
		>
			<FilterPokemons
				pokemonTypes={pokemonTypes}
				selectedPokemonType={element}
				setPokemonType={setElement}
				reset={reset}
			/>

			<div className={moduleStyles.list}>
				{
					currentList.map(pokemon => {
						return (<PokemonCard
							key={pokemon.name}
							name={pokemon.name}
							elements={pokemon.types.map(typ => typ.type.name)}
							avatarURL={pokemon.sprites.front_default}
							id={pokemon.id}
						/>)
					})
				}
			</div>

			<LoadMoreButton
				type="button"
				onClick={handlerLoadMore}
			>
				Load more
			</LoadMoreButton>
		</div>
	)
};
