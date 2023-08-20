import {  IPokemonStat, IPokemonStatName } from "entities/pokemon/model";

export function extractStatValue(name: IPokemonStatName, stats?: IPokemonStat[]) {
	if(!stats) return null;

	return stats.find(stat => stat.stat.name === name)?.base_stat;
}