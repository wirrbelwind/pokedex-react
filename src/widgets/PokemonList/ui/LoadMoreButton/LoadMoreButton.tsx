import classNames from "classnames";
import { LoadMoreButtonProps } from "./props";
import moduleStyles from './style.module.scss';

export const LoadMoreButton = (props: LoadMoreButtonProps) => {
	const {
		children,
		className,
		...otherProps
	} = props

	const buttonClasses = classNames(
		moduleStyles.button,
		className
	)

	return (
		<button
			type="button"
			className={buttonClasses}
			{...otherProps}
		>
			{children}
		</button>
	);
};