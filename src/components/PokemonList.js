import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

export const PokemonList = () => {
  const {
    pokemonList,
    pokemonPage,
    pokemonLimit,
    pokemonFilteredList,
    favoriteAction,
    filterPokemon,
    getPokemonList,
    favoritePokemon = {},
  } = useContext(GlobalContext);
  console.log("pokemonList", pokemonList, pokemonLimit);

  const [search, setSearch] = useState("");

  const getCurrentFrom = () => {
    if (pokemonPage === 1) return pokemonPage;
    return (pokemonPage - 1) * pokemonLimit;
  };

  const next = () => {
    getPokemonList(pokemonPage + 1);
  };

  const prev = () => {
    getPokemonList(pokemonPage - 1);
  };

  const getPreviousButton = () => {
    if (pokemonPage === 1) {
      return <div />;
    }
    return (
      <button
        className="font-medium text-red-500 focus:outline-none flex items-center text-center"
        onClick={prev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mx-2"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Previous</span>
      </button>
    );
  };

  const filter = ({key}) => {
    if (key === 'Enter') {
      filterPokemon(search)
    }
  }

  const printPokemonList = (results) => {
    if (pokemonFilteredList && search !== '') {
      return pokemonFilteredList
    }
    return results
  }

  return (
    <React.Fragment>
      {pokemonList && pokemonList.results && pokemonList.results.length > 0 ? (
        <div className="w-full max-w-4xl mb-40 mx-auto">
          <div className="flex px-5 py-5 mt-5 mb-5 shadow justify-between">
            <div className="text-red-400 font-medium">{`Showing ${getCurrentFrom()} to ${
              pokemonPage * pokemonLimit
            } of ${pokemonList.count} results`}</div>
            <div class="relative">
              <input
                onKeyPress={filter}
                onChange={({target:{value}}) => {
                  setSearch(value)
                  filterPokemon(value)
                }}
                type="text"
                className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="search..."
                value={search}
              />
              <svg
                className="w-4 h-4 absolute left-2.5 top-3.5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {search === '' && (
              <div className="flex justify-between xl:w-44">
              {getPreviousButton()}
              <button
                className="font-medium text-red-600 focus:outline-none flex items-center text-center"
                onClick={next}
              >
                <span>Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
            )}
          </div>
          {printPokemonList(pokemonList.results).map((pokemon) => (
            <div
              className="flex items-center bg-gray-100 mb-5 shadow"
              key={pokemon.url}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <Link to={`/detail/${pokemon.name}`}>
                  <p className="text-gray-900 leading-none">{pokemon.name}</p>
                </Link>
              </div>
              <div className="flex-auto text-right px-4 py-2 m-2">
                <button
                  onClick={() => favoriteAction(pokemon.url, pokemon)}
                  className="text-red-400 focus:outline-none block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
                  title="Remove Employee"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={
                      favoritePokemon[pokemon.url] ? "currentColor" : "none"
                    }
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
      )}
    </React.Fragment>
  );
};
