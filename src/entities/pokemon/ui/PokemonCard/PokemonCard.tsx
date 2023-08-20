import { PokemonCardProps } from "./props.ts";
import moduleStyles from './styles.module.scss';
import defaultAvatar from 'shared/assets/images/pokemon-ball.png'
import {ElementList} from "../ElementList/ElementList.tsx";
import classNames from "classnames";

export const PokemonCard = (props: PokemonCardProps) => {
  const {
    name = '<unknown>',
    avatarURL = defaultAvatar,
    elements,
    className,
    id
  } = props

  const isElements = elements && elements.length > 0
  const cardClass = classNames(
    moduleStyles.container,
    className
  )

  return (
    <button
      className={cardClass}
      type="button"
      data-pokemon-id={id}
    >
      <img
        className={moduleStyles.avatar}
        src={avatarURL}
      />

      <h6 className={moduleStyles.name}>
        {name.toUpperCase()}
      </h6>

      {
        isElements && <ElementList list={elements} />
      }

    </button>
  );
};
