import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"


function SearchBar() {
  const dispatch = useDispatch();
  
  const [buscador, setBuscador] = useState("")
  const originalPokemons = useSelector(state => state.originalPokemons);

    function handleChange(e){
      setBuscador(e.target.value)
    }

    function consultar(){
      validarTipo(buscador) && dispatch(actions.ActualizarName(buscador.toLowerCase()))
    }

    function limpiarCampo(){
      dispatch(actions.ActualizarName(""))
      setBuscador("")
      dispatch(actions.noFilter(originalPokemons))
    }

    function validarTipo(buscador){
      const regex = /^[^\d]*$/;
      let error = {}
      if(!regex.test(buscador)) error.message = "No puede contener números"
      error.message && console.log('contiene un número')    
      if(Object.keys(error).length == 0) return true
      else return false
    }

  return (
    <div className='searchBar_wrapper'>
        <span onClick={limpiarCampo}>Pokemons</span>
        <label htmlFor="buscador">Buscar Pokemon</label>
        <input type="text" id= 'buscador' name='buscador' value={buscador} onChange={handleChange} />
        <button onClick={limpiarCampo}>x</button>
        <input type="submit" value="Buscar" onClick={consultar} />
    </div>
  )
}

export default SearchBar