import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"

function Menu() {

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);
  const originalPokemons = useSelector(state => state.originalPokemons);

  return (
    <div className='menu_wrapper'>
      <div>
        <p>Por nombre</p>
        <button onClick={()=>{dispatch(actions.ordenarNombreDescendente(pokemons))}}>Z - A</button>
        <button onClick={()=>{dispatch(actions.ordenarNombreAscendente(pokemons))}}>A - Z</button>
      </div>

      <div>
        <p>Por ataque</p>
        <button onClick={()=>{dispatch(actions.ordenarAscendente(pokemons))}}>Mayor a menor</button>
        <button onClick={()=>{dispatch(actions.ordenarDescendente(pokemons))}}>Menor a mayor</button>
      </div>

      <div>
        <p>Por Tipo</p>
        <select onChange={(e)=>{
                                document.getElementById('buscador').value = ""
                                dispatch(actions.filtrarTipo(e.target.value, originalPokemons));
                                }} name="type">
          <option value="---">---</option>
          <option value="normal">normal</option>
          <option value="fighting">fighting</option>
          <option value="flying">flying</option>
          <option value="poison">poison</option>
          <option value="ground">ground</option>
          <option value="rock">rock</option>
          <option value="bug">bug</option>
          <option value="ghost">ghost</option>
          <option value="steel">steel</option>
          <option value="fire">fire</option>
          <option value="water">water</option>
          <option value="grass">grass</option>
          <option value="electric">electric</option>
          <option value="psychic">psychic</option>
          <option value="ice">ice</option>
          <option value="dragon">dragon</option>
          <option value="dark">dark</option>
          <option value="fairy">fairy</option>
          <option value="unknown">unknown</option>
          <option value="shadow">shadow</option>
        </select>
      </div>

      <div>
        <p> Por Base de Datos</p>
        <button onClick={()=>{document.querySelector('select').value = '---'
                              document.getElementById('buscador').value = ""
                              dispatch(actions.filtrarPokeApi(originalPokemons));
                              dispatch(actions.actualizarPaginado(1))}}>PokeApi</button>

        <button onClick={()=>{ document.querySelector('select').value = '---';
                              document.getElementById('buscador').value = ""
                              dispatch(actions.filtrarDB(originalPokemons))
                              dispatch(actions.actualizarPaginado(1))}}>Base de Datos</button>

        <button onClick={()=>{document.querySelector('select').value = '---';
                              document.getElementById('buscador').value = ""
                              dispatch(actions.noFilter(originalPokemons));
                              dispatch(actions.actualizarPaginado(1))}}>Mostrar todo</button>
      
      </div>

    </div>
  )
}

export default Menu