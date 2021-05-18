import React, { createContext, useReducer, useEffect } from 'react';
import { listPokemon, retrievePokemon } from '../services'

import appReducer from './AppReducer';

const initialState = {
  favoritePokemon: {},
  pokemonList: [],
  pokemonFilteredList: null,
  pokemonPage: 1,
  pokemonLimit: 20,
  pokemonInfo: {},
  user: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getUserInfo = async () => {
    try {
      const user = localStorage.getItem('pocApp_user');
      if (user) {
        dispatch({
          type: "UPDATE_USER",
          user
        });
        getPokemonList()
        retrieveFavoritePokemon()
      }
    } catch (error) {
      console.error('error getting user info', error)
    }
  }

  const getPokemonList = async (page = 1, limit = 20) => {
    try {
      const pokemonList = await listPokemon(limit, page === 1 ? 0 : page * limit )
      if (pokemonList){
        dispatch({
          type: "UPDATE_POKEMON_LIST",
          pokemonList,
          pokemonPage: page,
          pokemonLimit: limit
        });
      }
    } catch (error) {
      console.error('error getting pokemon list', error)
    }
  }

  const filterPokemon = async (pokemonName) => {
    const {pokemonList} = state
    if (pokemonList && pokemonList.results) {
      dispatch({
        type: "UPDATE_POKEMON_FILTERED_LIST",
        pokemonFilteredList: pokemonList.results.filter(({name}) => name.includes(pokemonName))
      });
    }
  }

  const retrieveFavoritePokemon = async () => {
    const _favoritePokemon = localStorage.getItem('pocApp_favorite_pokemon');
    if (_favoritePokemon) {
      dispatch({
        type: "UPDATE_FAVORITE_POKEMON",
        favoritePokemon: JSON.parse(_favoritePokemon)
      });
    }
  }

  const favoriteAction = async (pokemonId, pokemon) => {
    let _favoritePokemon = state.favoritePokemon
    if (_favoritePokemon[pokemonId]) {
      delete _favoritePokemon[pokemonId]
    } else {
      _favoritePokemon[pokemonId] = pokemon
    }
    localStorage.setItem('pocApp_favorite_pokemon', JSON.stringify(_favoritePokemon));
    dispatch({
      type: "UPDATE_FAVORITE_POKEMON",
      favoritePokemon: _favoritePokemon
    });
  }

  const getPokemonInfo = async (pokemonName) => {
    try {
      const pokemonInfo = await retrievePokemon(pokemonName)
      dispatch({
        type: "UPDATE_POKEMON_DETAIL",
        pokemonInfo: pokemonInfo
      });
    } catch (error) {
      console.error('error getting pokemon info', error)
    }
  }

  useEffect(() => {
    getUserInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getUserInfo,
        favoriteAction,
        getPokemonList,
        getPokemonInfo,
        filterPokemon
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};