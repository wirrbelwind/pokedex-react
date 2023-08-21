import { useCallback, useDebugValue, useEffect, useState } from "react";

import {
  POKEMON_API_BASE_URL,
} from "../consts/URLs";
import { httpClient } from "shared/api";
import { IPokemon } from "../interfaces/pokemon";
import { IPokemonBrief, IPokemonBriefResponse } from "../interfaces/pokemon-brief";
import { IElementType, elements } from "..";

interface PokemonListResponse {
  results: Array<{
    name: string
    url: string
  }>
}

export const useAllPokemons = (
  element: IElementType | null,
  setElement: (newElement: IElementType | null) => void
) => {
  const pokemonsPerChunk = 12;
  const [startIndex, setStartIndex] = useState(1)
  useDebugValue('pokemons')
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  //list of pokemon's {name, url}
  const [typedBriefList, setTypedBriefList] = useState<IPokemonBrief>([])

  const fetchRegularPokemonsChunk = useCallback(async () => {
    console.log('fetchRegularPokemonsChunk', startIndex);
    setIsLoading(true)

    const response = await httpClient.get<PokemonListResponse>(`${POKEMON_API_BASE_URL}/pokemon?limit=${pokemonsPerChunk}&offset=${startIndex}`);

    setStartIndex(prev => {
      return prev + pokemonsPerChunk
    })
    const briefList = response?.data?.results
    if (briefList) {
      for (let i = 0; i < briefList.length; i++) {
        const pokemon = (await httpClient.get<IPokemon>(briefList[i].url)).data
        setPokemons(prev => [...prev, pokemon]);
      }
    }
    setIsLoading(false)
  }, [startIndex])

  const fetchTypedPokemonsChunk = useCallback(async () => {
    console.log('fetchTypedPokemonsChunk', startIndex);
    setIsLoading(true)

    //specify end index for current chunk
    let endIndex = startIndex + 12
    if (endIndex > typedBriefList.length) endIndex = typedBriefList.length;

    // loop through only current chunk
    for (let i = startIndex; i < endIndex; i++) {
      //fetch specific pokemon by URL from briefList
      const url = typedBriefList[i].pokemon.url
      const pokemon = (await httpClient.get<IPokemon>(url)).data

      setPokemons(prev => [...prev, pokemon]);
    }
    // move start index to position of next chunk
    setStartIndex(prev => {
      return prev + pokemonsPerChunk
    })
    setIsLoading(false)
  }, [typedBriefList, element, startIndex])

  useEffect(() => {
    setIsLoading(true)
    setStartIndex(1);
    setPokemons([])

    if (element) {
      // triggers changing of typedBriefList
      fetchBriefList(element)
    }
    else {
      //triggers startIndex and pokemons
      fetchRegularPokemonsChunk()
    }

    async function fetchBriefList(newElement: IElementType) {
      const response = await httpClient.get<IPokemonBriefResponse>(`${POKEMON_API_BASE_URL}/type/${newElement}`);
      setTypedBriefList(response.data.pokemon)
    }
  }, [element])

  useEffect(() => {
    if (typedBriefList.length > 0) {
      // triggers startIndex and pokemons
      fetchTypedPokemonsChunk()
    }
  }, [typedBriefList])

  useEffect(() => {
    console.log(isLoading);
    
  }, [isLoading])


  return {
    pokemons,
    setPokemons,
    fetchMorePokemons: element ? fetchTypedPokemonsChunk : fetchRegularPokemonsChunk,
    types: Object.keys(elements) as IElementType[],
    isLoading,
    reset: () => {
      setStartIndex(1);
      setElement(null)
    }
  };
};
