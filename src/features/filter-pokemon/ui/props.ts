import { IElementType } from "entities/pokemon/model";

export interface FilterPokemonsProps {
	pokemonTypes: IElementType[]
	setPokemonType: (newType: IElementType | null) => void
	selectedPokemonType: IElementType | null
	reset: () => void
}
