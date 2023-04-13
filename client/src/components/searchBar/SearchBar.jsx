import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"
import {Link} from 'react-router-dom'


function SearchBar() {
  const dispatch = useDispatch();
  
  const originalPokemons = useSelector(state => state.originalPokemons);
  let searchPokemon = useSelector(state => state.search);

    function consultar(){
      const buscador = document.getElementById('buscador').value
      document.querySelector('select').value = "---"
      validarTipo(buscador) && dispatch(actions.getByName(buscador))
    }

    function limpiarCampo(){
      dispatch(actions.ActualizarName(""))
      document.getElementById('buscador').value = ""     
      document.querySelector('select').value = "---"
      dispatch(actions.noFilter(originalPokemons))
    }

    function validarTipo(buscador){
      const regex = /^[^\d]*$/;
      let error = {}
      if(!regex.test(searchPokemon)) error.message = "No puede contener números"
      error.message && console.log('contiene un número')    
      if(Object.keys(error).length === 0) return true
      else return false
    }

  return (
    <div className='searchBar_wrapper'>
        <span onClick={limpiarCampo}>Pokemons</span>
        <Link to='/form'><span>crear Pokemon</span></Link>
        <label htmlFor="buscador">Buscar Pokemon</label>
        <input type="text" id= 'buscador' name='buscador'defaultValue={searchPokemon} />
        <button onClick={limpiarCampo}>x</button>
        <input type="submit" value="Buscar" onClick={consultar} />
    </div>
  )
}

export default SearchBar