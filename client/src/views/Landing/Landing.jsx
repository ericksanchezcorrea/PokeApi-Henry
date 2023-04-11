import React from 'react'
import Pokemon from '../../assets/pokemon.png'
import {Link} from 'react-router-dom'

function Landing() {
  return (
    <div className='landing_wrapper'>
        <h1>Henry Pokemon by Erick Sánchez</h1>

        <img src={Pokemon} alt="pokemon" style={{height:'300px', width:'400px'}} />
        
        <div>
          <Link to='/home'><button>Home</button></Link>        
        </div>
    </div>
  )
}

export default Landing