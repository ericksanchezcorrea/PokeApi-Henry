export const validateForm = (form) =>{
    let error = {}
    const rexExpNumeros= new RegExp("^[0-9]+$");
    const rexExpLetras= new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$");

    // Nombre solo puede contener letras
    if(!rexExpLetras.test(form.name)) error.name= "Nombre solo puede contener letras"

    // hp, attack, defense, height, weight,  solo puedo contener números
    if(!rexExpNumeros.test(form.hp)) error.hp= "Vida debe ser un número"
    if(!rexExpNumeros.test(form.attack)) error.attack= "Ataque debe ser un número"
    if(!rexExpNumeros.test(form.defense)) error.defense= "Defensa debe ser un número"
    if(!rexExpNumeros.test(form.height) && form.height) error.height= "Altura debe ser un número"
    if(!rexExpNumeros.test(form.weight) && form.weight) error.weight= "Peso debe ser un número"
    if(!rexExpNumeros.test(form.speed)  && form.speed) error.speed= "Velocidad debe ser un número"

    // Campos no pueden estar vacíos
    if(!form.name) error.name = "Nombre no puede estar vacío"
    if(!form.image) error.image = "Seleccione una imagen"
    if(!form.hp) error.hp = "Vida no puede estar vacío"
    if(!form.attack) error.attack = "Ataque no puede estar vacío"
    if(!form.defense) error.defense = "Defensa no puede estar vacío"
    if(form.types.length === 0) error.type= "Debe seleccionar al menos un tipo"
    
    return error
}