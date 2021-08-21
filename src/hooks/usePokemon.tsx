import { useState, useEffect } from "react";
import { fetchAllPokemons } from "../helpers/fecthAllPokemons";
import { Pokemon } from "../interfaces/fetchAllPokemonReponse";

export const usePokemon = () => {
  const [isLoading, setisLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    //carga de los Pokemons
    fetchAllPokemons().then((pokemons) => {
      setisLoading(false);
      setPokemons(pokemons);
    });
  }, []);

  return {
    isLoading,
    pokemons,
  };
};
