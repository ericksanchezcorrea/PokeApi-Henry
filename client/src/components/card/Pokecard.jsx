import {useEffect, useState} from 'react'

function Pokecard({name, types, image, attack}) {

  const [isLoading, setIsLoading] = useState(true);
  const buffer = Buffer.from(image);
  const data = buffer && buffer.toString('utf8');

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className='pokecard'>

      {isLoading ?
        <div className="spinner"></div> :
        <div>
          <img src={data} alt={name} width='200px' height='150px' />
          <p>Nombre: <span>{name}</span></p>
          <p>Tipos: 
            {
              types?.map((tipo, index) => (<span key={index}> {tipo} </span>))
            }
          </p>
          <p>Ataque: {attack}</p>
        </div>
      }

    </div>    
  )
}
export default Pokecard