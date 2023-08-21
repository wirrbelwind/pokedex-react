import { useCallback, useDebugValue, useEffect, useState } from "react";

import { httpClient } from "shared/api";
import { POKEMON_API_BASE_URL } from "../consts/URLs";
import { IElementType, elements } from "../consts/elements";
import { IPokemon } from "../interfaces/pokemon";
import { IPokemonBrief, IPokemonBriefResponse } from "../interfaces/pokemon-brief";

export const usePokemonsByType = (
	element: IElementType | null,
	setElement: (newElement: IElementType | null) => void
) => {
	useDebugValue('pokemons by type')

	const pokemonsPerChunk = 12;
	// start index of pokemon's list
	const [startIndex, setStartIndex] = useState(1)
	const [pokemons, setPokemons] = useState<IPokemon[]>([]);
	//list of pokemon's {name, url}
	const [briefList, setBriefList] = useState<IPokemonBrief>([])

	useEffect(() => {
		//when appears new value of element
		if (element) {
			// reset states
			setPokemons([])
			setStartIndex(1)
			//fetch briefList using new value of element
			fetchBriefList(element)
		}

		async function fetchBriefList(newElement: IElementType) {
			const response = await httpClient.get<IPokemonBriefResponse>(`${POKEMON_API_BASE_URL}/type/${newElement}`);
			setBriefList(response.data.pokemon)
		}
	}, [element])

	// immediately fetch chunk of pokemons from new briefList
	useEffect(() => {
		if (briefList.length > 0) {
			fetchPokemonsChunk()
		}
	}, [briefList])

	const fetchPokemonsChunk = useCallback(async () => {
		//specify end index for current chunk
		let endIndex = startIndex + 12
		if (endIndex > briefList.length) endIndex = briefList.length;

		// loop through only current chunk
		for (let i = startIndex; i < endIndex; i++) {
			//fetch specific pokemon by URL from briefList
			const url = briefList[i].pokemon.url
			const pokemon = (await httpClient.get<IPokemon>(url)).data

			setPokemons(prev => [...prev, pokemon]);
		}
		// move start index to position of next chunk
		setStartIndex(prev => {
			return prev + pokemonsPerChunk
		})
	}, [briefList, element, startIndex])

	const reset = () => {
		setPokemons([])
		setElement(null)
	}

	return {
		pokemons,
		fetchMorePokemons: fetchPokemonsChunk,
		pokemonTypes: Object.keys(elements) as IElementType[],
		setPokemons,
		reset
	}
}
