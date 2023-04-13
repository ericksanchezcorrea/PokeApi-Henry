export const ACTUALIZAR_NAME = 'ACTUALIZAR_NAME';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const ORDENAR_ASCENDENTE = 'ORDENAR_ASCENDENTE';
export const ORDENAR_DESCENDENTE = 'ORDENAR_DESCENDENTE';
export const ORDENAR_NOMBRE_DESCENDENTE = 'ORDENAR_NOMBRE_DESCENDENTE';
export const ORDENAR_NOMBRE_ASCENDENTE = 'ORDENAR_NOMBRE_ASCENDENTE';
export const FILTRAR_POKEAPI = 'FILTRAR_POKEAPI';
export const FILTRAR_BD = 'FILTRAR_BD';
export const NO_FILTER = 'NO_FILTER';
export const FILTRAR_TIPO = 'FILTRAR_TIPO';
export const CAMBIAR_PAGINADO = 'CAMBIAR_PAGINADO';
export const ACTUALIZAR_PAGINADO = 'ACTUALIZAR_PAGINADO';
export const GET_BY_NAME = 'GET_BY_NAME';


export const ActualizarName = (name) => async dispatch =>{
    return dispatch({type: ACTUALIZAR_NAME, payload: name})
}

export const getAllPokemons = (url) => async dispatch => {
    const data = await fetch(url);
    const response = await data.json();
    return dispatch({type: GET_ALL_POKEMONS, payload: response})

};

export const getByName = (name) => async dispatch => {
    
    const URL = `http://localhost:3001/pokemons/?name=${name}`;
    const data = await fetch(URL);
    
    if(data.status === 400){
        return dispatch({type: GET_BY_NAME, payload: []})    
    }
    else{
        const response = await data.json();
        return dispatch({type: GET_BY_NAME, payload: response})
    }

};


// Ataque
export const ordenarAscendente = (data) => async dispatch => {
    return dispatch({type: ORDENAR_ASCENDENTE, payload: data.sort((a,b)=>b.attack - a.attack)})
};

export const ordenarDescendente = (data) => async dispatch => {
    return dispatch({type: ORDENAR_DESCENDENTE, payload: data.sort((a,b)=>a.attack - b.attack)})
};


// Nombre
export const ordenarNombreDescendente = (data) => async dispatch => {
    return dispatch({type: ORDENAR_NOMBRE_DESCENDENTE, payload: data.sort((a,b)=>{
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      })})
};

export const ordenarNombreAscendente = (data) => async dispatch => {
    return dispatch({type: ORDENAR_NOMBRE_ASCENDENTE, payload: data.sort((a,b)=>{
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })})
};


// Filtros
export const filtrarPokeApi = (data) => async dispatch => {
    return dispatch({type: FILTRAR_POKEAPI, payload: data.filter(d=> d.db === "pokeapi" )})
};

export const filtrarDB = (data) => async dispatch => {
    return dispatch({type: FILTRAR_BD, payload: data.filter(d=> d.db === "db" ) })
};

export const noFilter = (data) => async dispatch => {
    return dispatch({type: NO_FILTER, payload: data})
};

export const filtrarTipo = (type, data) => async dispatch => {

    if(type === "---"){
        return dispatch({type: FILTRAR_TIPO, payload: data})
    }
    else{
        const datos = await fetch(`http://localhost:3001/pokemons/filter/${type}`)
        const response = await datos.json()
        return dispatch({type: FILTRAR_TIPO, payload: response})
    }
};


//paginado 
export const cambiarPaginado = (id) => async dispatch => {
    const datos = await fetch(`http://localhost:3001/pokemons/next/${id}`)
    const response = await datos.json()
    return dispatch({type: CAMBIAR_PAGINADO, payload: response})
};

export const actualizarPaginado = (data) => async dispatch => {
    return dispatch({type: ACTUALIZAR_PAGINADO, payload: data})
};
