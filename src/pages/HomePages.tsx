import { ChangeEvent, useState } from "react";
import { Loading } from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../interfaces/fetchAllPokemonReponse";

export const HomePages = () => {
  const { pokemons, isLoading } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");

  const filteredPokemons = (): Pokemon[] => {
    if (searchText.length === 0)
      return pokemons.slice(currentPage, currentPage + 5);

    const filtered = pokemons.filter((poke) => poke.name.includes(searchText));
    return filtered.slice(currentPage, currentPage + 5);
  };
  const nextPage = () => {
    if (
      pokemons.filter((poke) => poke.name.includes(searchText)).length >
      currentPage + 5
    )
      setCurrentPage(currentPage + 5);
  };
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  const handleChangeTSearch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearchText(target.value);
  };

  return (
    <>
      <div className="mt-5">
        <h1>Listado de Pokemons</h1>
        <hr />
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Encuentra tu Pokemon"
            name={searchText}
            value={searchText}
            onChange={handleChangeTSearch}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 100 }}>ID</th>
              <th style={{ width: 150 }}>Nombre</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {filteredPokemons().map(({ id, name, pic }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <img src={pic} alt={name} style={{ width: 75 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <Loading />}
        <button onClick={prevPage} className="btn btn-primary">
          Anteriores
        </button>
        &nbsp;
        <button onClick={nextPage} className="btn btn-primary">
          Siguientes
        </button>
      </div>
    </>
  );
};
