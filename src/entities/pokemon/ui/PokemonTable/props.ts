import { IElementType } from "entities/pokemon/model"

export interface PokemonTableProps {
	className?: string

	id: number
	name: string
	avatar?: string
	types: IElementType[]
	attack: number
	defense: number
	hp: number
	spAttack: number
	spDefense: number
	speed: number
	weight: number
	total_moves: number
}