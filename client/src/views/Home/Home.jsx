import React from 'react'
import CardContainer from '../../components/cardContainer/CardContainer'
import Menu from '../../components/menu/Menu'
import Paginado from '../../components/paginado/Paginado'
import SearchBar from '../../components/searchBar/SearchBar'

import { useSelector } from "react-redux";

function Home() {
  
  const pokemons = useSelector(state => state.pokemons);
  
  function mostrarTiposPrimerPokemon(pokemons) {
    let primerElemento = pokemons[0].types;
    
    let contadorCoincide = 0;
  
    for (let i = 0; i < pokemons.length; i++) {
      for (let j = 0; j < pokemons[i].types.length; j++) {
        if (primerElemento.includes(pokemons[i].types[j])) {
          contadorCoincide++;
          break;
        }
      }
    }
  
    if (contadorCoincide === pokemons.length) {
      return false;
    } else {
      return true;
    }
  }
  
    
  return (
    <div className='home_wrapper'>
      <SearchBar />
      <Menu  />
      <CardContainer />

      {  pokemons.length !== 0 && mostrarTiposPrimerPokemon(pokemons) && pokemons.some(p => p.db === "pokeapi") && <Paginado />}
      
    </div>
  )
}

export default Home