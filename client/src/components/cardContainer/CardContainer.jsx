import React from 'react'
import { useState, useEffect } from 'react'
import Pokecard from '../card/Pokecard'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions"

function CardContainer() {
    
    const pokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true)

    const url = "http://localhost:3001/pokemons/"

    const getAll = async()=>{
        await dispatch(actions.getAllPokemons(url))
        setIsLoading(false)
    }

    useEffect(() => {
        getAll()
    }, [])
    
    
  return (
    <div className='cardContainer_wrapper'>

        {isLoading && 
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center' ,alignItems:'center', gap:'20px'}}>
                <div className='spinner'></div>
                <div>Cargando pokemons ...</div>
            </div>
        }

        {!isLoading && pokemons.length === 0 && <div>Pokemon no encontrado</div>}
        
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