import { useCallback, useDebugValue, useEffect, useState } from "react";

import {
  POKEMON_API_BASE_URL,
} from "../consts/URLs";
import { httpClient } from "shared/api";
import { IPokemon } from "../interfaces/pokemon";

interface PokemonListResponse {
  results: Array<{
    name: string
    url: string
  }>
}

export const usePokemons = () => {
  const pokemonsPerChunk = 12;
  const [startIndex, setStartIndex] = useState(1)
  useDebugValue('pokemons')
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    fetchPokemons()
  }, [])

  const fetchPokemons = useCallback(async () => {
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
  }, [startIndex])

  return {
    pokemons,
    fetchMorePokemons: fetchPokemons,
    setPokemons,
  };
};
