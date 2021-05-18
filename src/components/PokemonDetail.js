import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

export const PokemonDetail = (match) => {
  let history = useHistory();

  const { pokemonInfo, getPokemonInfo } = useContext(GlobalContext);

  const pokemonName = match.params.pokemonName || null;

  useEffect(() => {
    if (pokemonName) {
      getPokemonInfo(pokemonName);
    }
  }, [pokemonName]);

  if (!pokemonName || !pokemonInfo) {
    return <div>Invalid pokemon name.</div>;
  }

  return (
    <div class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-4xl  bg-white w-full rounded-lg shadow">
        <div class="p-4 border-b flex">
          <button className="focus:outline-none text-red-600 mr-2" onClick={() => history.goBack()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 class="text-2xl">{pokemonName} details</h2>
        </div>
        <div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">Base experience</p>
            <p>{pokemonInfo.base_experience}</p>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">Height</p>
            <p>{pokemonInfo.height}</p>
          </div>
          <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
            <p class="text-gray-600">Weight</p>
            <p>{pokemonInfo.weight}</p>
          </div>
          {pokemonInfo.abilities && (
            <div class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p class="text-gray-600">Abilities</p>
              <p>
                {pokemonInfo.abilities.map(({ability: {name}}) => <span className="bg-red-50 mr-2 px-2 py-1 rounded-lg">{name}</span>)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
