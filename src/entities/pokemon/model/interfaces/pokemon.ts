import { IElementType } from "../consts/elements"

// An actual interface of API's pokemon is much bigger, 
//so I defined only needed properties
export interface IPokemon {
	id: number
	name: string
	types: IPokemonElementResponse[]
	weight: number
	stats: IPokemonStat[]
	moves: []
	sprites: {
		front_default: string // avatar url
	}
}

interface IPokemonElementResponse {
	slot: number
	type: {
		name: IElementType
		url: string
	}
}

export interface IPokemonStat {
	base_stat: number
	stat: {
		name: IPokemonStatName
	}
}
export type IPokemonStatName = 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'
