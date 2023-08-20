import { FilterPokemonsProps } from "features/filter-pokemon/ui/props";
import moduleStyle from './style.module.scss';
import { IElementType } from "entities/pokemon/model";
import classNames from "classnames";

export const FilterPokemons = (props: FilterPokemonsProps) => {
	const {
		selectedPokemonType,
		pokemonTypes,
		setPokemonType,
		reset
	} = props

	const handlerClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		const target = event.target as HTMLElement;
		const button = target.closest(`.${moduleStyle.btn}`) as HTMLButtonElement
		if (!button) return;

		const selectedValue = button.dataset.elementValue as IElementType
		if (!selectedValue) return;

		setPokemonType(selectedValue)
	}

	//classes
	const selectedButtonClass = classNames(
		moduleStyle.btn,
		moduleStyle.active
	)
	const resetButtonClass = classNames(
		moduleStyle.btn,
		moduleStyle.resetBtn
	)

	return (
		<div onClick={handlerClick} className={moduleStyle.container}>
			<button
				className={resetButtonClass}
				type="button"
				onClick={reset}
				disabled={!selectedPokemonType}
			>
				Reset
			</button>
			{
				pokemonTypes.map(typ => (
					<button
						key={typ}
						className={
							typ === selectedPokemonType ?
								selectedButtonClass : moduleStyle.btn
						}
						data-element-value={typ}
						type="button"
					>
						{typ}
					</button>
				))
			}
		</div>
	);
};
