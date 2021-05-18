import axios from 'axios';

const POKEMON_SERVER = 'https://pokeapi.co/api/v2'

export const listPokemon = async (limit=20, offset=0) => {
  const result = await axios.get(`${POKEMON_SERVER}/pokemon?limit=${limit}&offset=${offset}`)
  const { data } = result
  return data
}

export const retrievePokemon = async (name) => {
  const result = await axios.get(`${POKEMON_SERVER}/pokemon/${name}`)
  const { data } = result
  return data
}