export default function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user
      }
    case 'UPDATE_POKEMON_LIST':
      return {
        ...state,
        pokemonList: action.pokemonList,
        pokemonPage: action.pokemonPage,
        pokemonLimit: action.pokemonLimit
      }
    case 'UPDATE_POKEMON_FILTERED_LIST':
      return {
        ...state,
        pokemonFilteredList: action.pokemonFilteredList
      }
    case 'UPDATE_FAVORITE_POKEMON':
      return {
        ...state,
        favoritePokemon: action.favoritePokemon
      }
    case 'UPDATE_POKEMON_DETAIL':
      return {
        ...state,
        pokemonInfo: action.pokemonInfo
      }
    default:
      return state;
  }
}