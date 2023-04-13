import {useState} from 'react'
import {validateForm} from './validateForm.js';
import {Link} from 'react-router-dom';

const initialForm = {
    name:"",
    hp:"",
    attack:"",
    defense:"",
    height:"",
    speed:"",
    weight:"",
    image:"",
    types:[],
}

function Form() {
    
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState({})
    const [isOk, setIsOk] = useState(false)


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

    function limpiarCampos (){
        document.getElementById('image').value = "";
        document.querySelectorAll('input[type="checkbox"]').forEach(input=>{input.checked=false})
        setForm(initialForm)
        setIsOk(false)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const validation = validateForm(form)
        setError(validation)
        if( Object.keys(validation).length > 0 ) return

        const form2 = {...form}
        if(form2.height === "") form2.height = null
        if(form2.speed === "") form2.speed = null
        if(form2.weight === "") form2.weight = null
    
        fetch('http://localhost:3001/pokemons/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form2)
          })
        .then(response => response.json())
        .then(data => { 
                        if(typeof data == 'object') {
                            setIsOk(true)
                        }
                        else{
                            setIsOk(false)
                            if(data === 'Pokemon ya creado') setError({...error, name: data})
                            else setError({...error, name: "Revise los datos"})
                           
                        } 
                    })
    }

  return (
    <div className='form_wrapper'>
        <h2>Crear Pokemon</h2>
            <Link to="/home"><button>ver Pokemons</button></Link> 
            <button onClick={limpiarCampos}>Crear otro Pokemon</button>
        <form onSubmit={handleSubmit}>
            <div className='inputTextContainer'>
                <label htmlFor="name">Nombre</label>
                <input type="text" id='name' name='name' autoComplete='off' onChange={handleChange} value={form.name} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="hp">Vida</label>
                <input type="text" id='hp' name='hp' autoComplete='off' onChange={handleChange} value={form.hp} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="attack">Ataque</label>
                <input type="text" id='attack' name='attack' autoComplete='off' onChange={handleChange} value={form.attack} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="defense">Defensa</label>
                <input type="text" id='defense' name='defense' autoComplete='off'onChange={handleChange} value={form.defense} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="height">Altura</label>
                <input type="text" id='height' name='height' autoComplete='off' onChange={handleChange} value={form.height} />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="speed">Velocidad</label>
                <input type="text" id='speed' name='speed'autoComplete='off' onChange={handleChange} value={form.speed}  />
            </div>
            <div className='inputTextContainer'>
                <label htmlFor="weight">Peso</label>
                <input type="text" id='weight' name='weight' autoComplete='off' onChange={handleChange} value={form.weight} />
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
                <button type='submit' value="Crear Pokemon" >Crear</button>
                
            </div>
        </form>

        <div className='response_container'>

            { Object.keys(error).length > 0  && 
            <p className='response warning'>{(error.name || error.hp || error.attack || error.defense || error.image  || error.type || error.weight || error.height || error.speed || error.message)} </p>} 

           {isOk && <p className='response success'>Pokemon creado satisfactoriamente</p>}
        </div>

        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <button onClick={limpiarCampos}>Crear otro Pokemon</button>
        </div>
    </div>
  )
}

export default Form

