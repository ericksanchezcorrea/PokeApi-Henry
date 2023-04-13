import React, {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions"

function Detail() {

  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  const id = useParams().id
  const navigate = useNavigate()
  const url = `http://localhost:3001/pokemons/${id}`

  async function getAll (url){
    let data = await fetch(url)
    let respuesta = await data.json()
    return respuesta 
  }


  useEffect(() => {

    (async function() {
        const datos = await getAll(url);
        setPokemon(datos)
        setIsLoading(false);

      })();
      
    }, [url])

    const buffer = pokemon && Buffer.from(pokemon.image);
    const data = buffer && buffer.toString('utf8');
console.log(typeof pokemon?.attack)
console.log(typeof pokemon?.speed)
  return (
    <div className='detail_wrapper'>
      <button onClick={()=>{navigate("/home");
                            dispatch(actions.actualizarPaginado(1))}}>Ver más pokemons</button>
      <h2>{pokemon?.name.toUpperCase()} </h2>
      <h3>Id: {id}</h3>
      {
        isLoading ?
        <div className="spinner"></div> :
        <img src={data} alt={pokemon?.name} />
      }

      <table>
        <tbody>
          <tr>
            <th>Vida</th>
            <th>{pokemon?.hp}</th>
          </tr>
          <tr>
            <th>Ataque</th>
            <th>{pokemon?.attack}</th>
          </tr>
          <tr>
            <th>Defensa</th>
            <th>{pokemon?.defense} </th>
          </tr>
          <tr>
            <th>Velocidad</th>
            <th>{pokemon?.speed}</th>
          </tr>
          <tr>
            <th>Altura</th>
            <th>{pokemon?.height}</th>
          </tr>
          <tr>
            <th>Peso</th>
            <th>{pokemon?.weight} </th>
          </tr>
          <tr>
            <th>Tipo</th>
            <th>{pokemon?.types && new Intl.ListFormat('es').format(pokemon.types)}</th>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default Detail