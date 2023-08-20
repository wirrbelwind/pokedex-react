export interface IPokemonBriefResponse {
	pokemon: IPokemonBrief
}
export type IPokemonBrief = Array<{
	pokemon: {
		name: string
		url: string
	}
}>
