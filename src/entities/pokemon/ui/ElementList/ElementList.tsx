import {elements} from "entities/pokemon/model/consts/elements";
import { ElementListProps } from "./props";
import moduleStyles from './styles.module.scss';

export const ElementList = (props: ElementListProps) => {
	const { list } = props

	return (
		<div className={moduleStyles['element-list']}>
			{
				list.map(elementName => (
					<div
						key={elementName}
						className={moduleStyles.element}
						style={{ background: elements[elementName] || 'gray' }}
					>
						{elementName}
					</div>
				))
			}
		</div>
	);
};
