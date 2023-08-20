import { PokemonTableProps } from "./props";
import defaultAvatar from 'shared/assets/images/pokemon-ball.png'
import moduleStyle from './style.module.scss';
import classNames from "classnames";

export const PokemonTable = (props: PokemonTableProps) => {
	const {
		attack,
		defense,
		hp,
		id,
		name,
		spAttack,
		spDefense,
		speed,
		total_moves,
		types,
		weight,
		avatar = defaultAvatar,

		className,
	} = props

	const containerClass = classNames(
		moduleStyle.container,
		className
	)

	const tableData: Record<string, string | number> = {
		'Type': types.join(', ').slice(0, -2) || '',
		'Attack': attack,
		'Defense': defense,
		'HP': hp,
		'SP Attack': spAttack,
		'SP Defense': spDefense,
		'Speed': speed,
		'Weight': weight,
		'Total moves': total_moves
	}

	return (
		<div className={containerClass}>
			<img
				className={moduleStyle.avatar}
				src={avatar}
				alt={`${name}'s avatar`}
			/>

			<h6 className={moduleStyle.name}>
				#{id} {name}
			</h6>

			<table className={moduleStyle.table}>
				<tbody>
				{
					Object.entries(tableData).map(([name, value]) => {
						return (
							<tr key={name} className={moduleStyle.tRow}>
								<td className={moduleStyle.tData}>{name}</td>
								<td className={moduleStyle.tData}>{value}</td>
							</tr>)
					})
				}
				</tbody>
			</table>
		</div>
	);
};
