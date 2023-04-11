import React, {useState} from 'react'
import CardContainer from '../../components/cardContainer/CardContainer'
import Menu from '../../components/menu/Menu'
import Paginado from '../../components/paginado/Paginado'
import SearchBar from '../../components/searchBar/SearchBar'

import { useSelector, useDispatch } from "react-redux";


function Home() {

  const pokemons = useSelector(state => state.pokemons);

  return (
    <div className='home_wrapper'>
      <SearchBar />
      <Menu  />
      <CardContainer />

      {pokemons.length > 1 && <Paginado />}
      
    </div>
  )
}

export default Home