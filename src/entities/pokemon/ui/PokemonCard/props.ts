import { IElementType } from "entities/pokemon/model/consts/elements";
import { MouseEventHandler } from "react";

export interface PokemonCardProps {
  id: number
  avatarURL?: string;
  name?: string;
  elements?: IElementType[];
  className?: string
}
