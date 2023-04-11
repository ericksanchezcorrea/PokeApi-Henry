import {useState} from 'react'

function Form() {

    const [form, setForm] = useState({types:[]});

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name] : e.target.value
        })
    }

    const handleImage = (e) => {
       
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.addEventListener('load',(e)=>{
            setForm({
                ...form, image : e.target.result
            })
        })
    }

    function handleCheck(e) {
        const tipoSeleccionado = e.target.value;
        const isChecked = e.target.checked;
        
        if (isChecked) {
          setForm({
            ...form, types: [...form.types, tipoSeleccionado]
          })
        } else {
          setForm({
            ...form, types:[...form.types.filter(el => el !== tipoSeleccionado) ]
          })
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(form)
        fetch('http://localhost:3001/pokemons/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
          })

        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

  return (
    <div className='form_wrapper'>
        <h2>Crear Pokemon</h2>
        <form onSubmit={handleSubmit}>
            <div className='inputTextContainer'>
                <label htmlFor="name">Nombre</label>
                <input type="text" id='name' name='name' autoComplete='off' onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="hp">Vida</label>
                <input type="text" id='hp' name='hp' autoComplete='off' onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="attack">Ataque</label>
                <input type="text" id='attack' name='attack' autoComplete='off' onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="defense">Defensa</label>
                <input type="text" id='defense' name='defense' autoComplete='off'onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="height">Altura</label>
                <input type="text" id='height' name='height' autoComplete='off' onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="speed">Velocidad</label>
                <input type="text" id='speed' name='speed'autoComplete='off' onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="weight">Peso</label>
                <input type="text" id='weight' name='weight' autoComplete='off' onChange={handleChange} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="imagen">Imagen</label>
                <input type="file" name="image" id="image" onChange={handleImage} />
            </div>

            <p>Selecciona el tipo</p>
            <div className='inputCheckContainer'>
                <div>
                    <label><input type="checkbox" name="types" value="normal" onChange={handleCheck} />normal</label>
                    <label><input type="checkbox" name="types" value="fighting" onChange={handleCheck}/>fighting</label>
                    <label><input type="checkbox" name="types" value="flying" onChange={handleCheck}/>flying</label>
                    <label><input type="checkbox" name="types" value="poison" onChange={handleCheck}/>poison</label>
                    <label><input type="checkbox" name="types" value="ground" onChange={handleCheck}/>ground</label>
                    <label><input type="checkbox" name="types" value="rock" onChange={handleCheck}/>rock</label>
                    <label><input type="checkbox" name="types" value="bug" onChange={handleCheck}/>bug</label>
                    <label><input type="checkbox" name="types" value="ghost" onChange={handleCheck}/>ghost</label>
                    <label><input type="checkbox" name="types" value="steel" onChange={handleCheck}/>steel</label>
                    <label><input type="checkbox" name="types" value="fire" onChange={handleCheck}/>fire</label>
                </div>

                <div>
                    <label><input type="checkbox" name="types" value="water" onChange={handleCheck} />water</label>
                    <label><input type="checkbox" name="types" value="grass" onChange={handleCheck} />grass</label>
                    <label><input type="checkbox" name="types" value="electric" onChange={handleCheck} />electric</label>
                    <label><input type="checkbox" name="types" value="psychic" onChange={handleCheck} />psychic</label>
                    <label><input type="checkbox" name="types" value="ice" onChange={handleCheck} />ice</label>
                    <label><input type="checkbox" name="types" value="dragon" onChange={handleCheck} />dragon</label>
                    <label><input type="checkbox" name="types" value="dark" onChange={handleCheck} />dark</label>
                    <label><input type="checkbox" name="types" value="fairy" onChange={handleCheck} />fairy</label>
                    <label><input type="checkbox" name="types" value="unknown" onChange={handleCheck} />unknown</label>
                    <label><input type="checkbox" name="types" value="shadow" onChange={handleCheck} />shadow</label>
                </div>

            </div>

            <div>
                <button type='submit' value="Crear Pokemon" >Crear Pokemon</button>
            </div>
        </form>

        <div className='response_container'>
            <p className='response success warning'>Pokemon creado satisfactoriamente</p>
        </div>
    </div>
  )
}

export default Form

