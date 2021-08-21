import { pokemonApi } from "../api/pokemonApi";
import { SmallPokemon } from "../interfaces/fetchAllPokemonReponse";
import {
  FetchAllPokemonResponse,
  Pokemon,
} from "../interfaces/fetchAllPokemonReponse";

export const fetchAllPokemons = async (): Promise<Pokemon[]> => {
  const resp = await pokemonApi.get<FetchAllPokemonResponse>(
    "/pokemon?limit=1100"
  );

  const smallPokemonList = resp.data.results;

  return transformSmallIntoPokemon(smallPokemonList);
};

const transformSmallIntoPokemon = (
  smallPokemonList: SmallPokemon[]
): Pokemon[] => {
  const pokemonArr: Pokemon[] = smallPokemonList.map((poke) => {
    const pokeArr = poke.url.split("/");
    const id = pokeArr[6];
    const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;

    return {
      id,
      pic,
      name: poke.name,
    };
  });
  return pokemonArr;
};
