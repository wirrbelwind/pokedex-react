import { IPokemon } from "entities/pokemon/model"

export interface PokemonListProps {
	className?: string
	onSelect?: (value: IPokemon | null) => void
}
