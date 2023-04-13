import * as TYPES from '../actions/index.js'

const initialState = {
  
  search: "",
  pokemons: [],
  originalPokemons: [],
  page:1
};

const rootReducer = (state = initialState, {type, payload}) => {

   switch (type) {

    case TYPES.ACTUALIZAR_NAME: 
      return {...state, search: payload}

    case TYPES.GET_ALL_POKEMONS: 
      return {...state, pokemons: [...payload], originalPokemons:[...payload]}

    case TYPES.GET_BY_NAME: 
      return {...state, pokemons: [...payload]}

    case TYPES.ORDENAR_ASCENDENTE: 
      return {...state, pokemons: [...payload]}

    case TYPES.ORDENAR_DESCENDENTE: 
      return {...state, pokemons: [...payload]}

    case TYPES.ORDENAR_NOMBRE_DESCENDENTE: 
      return {...state, pokemons: [...payload]}

    case TYPES.ORDENAR_NOMBRE_ASCENDENTE: 
      return {...state, pokemons: [...payload]}

    case TYPES.FILTRAR_POKEAPI: 
      return {...state, pokemons: [...payload]}

    case TYPES.FILTRAR_BD: 
      return {...state, pokemons: [...payload]}

    case TYPES.NO_FILTER: 
      return {...state, pokemons: [...payload]}

    case TYPES.FILTRAR_TIPO: 
      return {...state, pokemons: [...payload]}

    case TYPES.CAMBIAR_PAGINADO: 
      return {...state, pokemons: [...payload]}

    case TYPES.ACTUALIZAR_PAGINADO: 
      return {...state, page: payload}


    default: 
      return initialState
    }
};

export default rootReducer;
