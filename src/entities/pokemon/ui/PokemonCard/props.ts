import { IElementType } from "entities/pokemon/model/consts/elements";
export interface PokemonCardProps {
  id: number
  avatarURL?: string;
  name?: string;
  elements?: IElementType[];
  className?: string
}
