import React from 'react'
import { useState, useEffect } from 'react'
import Pokecard from '../card/Pokecard'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"

function CardContainer() {
    
    const pokemon = useSelector(state => state.search);
    const pokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const url = `http://localhost:3001/pokemons/${pokemon ? "?name="+pokemon : ""}`
    
    async function getAll (){
        try{
            let data = await fetch(url)
            let respuesta = await data.json()
            if(data.status == 400){
                setIsLoading(false)
                setError(true)
                dispatch(actions.getAllPokemons([]))                
                return
            }else{
                setIsLoading(false)
                setError(false)
                return respuesta
            }
        }catch(error){
            console.log(error)
        }
    }    

    useEffect(() => {

        (async function() {
            const datos = await getAll(url);
            if(typeof datos == 'object'){
                dispatch(actions.getAllPokemons(datos))
            }
        })();
        
    }, [url])
    
  return (
    <div className='cardContainer_wrapper'>

        {isLoading && 
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center' ,alignItems:'center', gap:'20px'}}>
                <div className='spinner'></div>
                <div>Cargando pokemons ...</div>
            </div>
        }

        {error && <div>Pokemon no encontrado</div> }
        {!isLoading && pokemons && pokemons.map((el)=>
            { 
                return (<Link to={`/detail/${el.id}`}  key={el.id}>
                            <Pokecard name={el.name} types={el.types} image={el.image} attack={el.attack} />
                        </Link>)
            }
        )
        }
    </div>
  )
}

export default CardContainer