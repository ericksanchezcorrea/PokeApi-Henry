const pokemonRouter = require("express").Router();
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize")
const axios = require("axios");
const { response } = require("../app");
// const {shadow, fairy, dark, dragon, ice, psychic, electric, grass, water, steel, ghost, bug, rock, ground, poison, flying, fighting, normal, fire, unknown} = require("./tipos") 

const tipos = require("./tipos")

pokemonRouter.post("/", async (req, res) => {
    try{
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        const pokemonFound = await Pokemon.findOne({ where: {name } });
        if(pokemonFound) throw new Error ("Pokemon ya creado")

        let typesDb = await Type.findAll({
            where: {name: types}
        });
        const pokemonCreated= await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });
        pokemonCreated.addType(typesDb);

        res.status(200).json({...pokemonCreated.dataValues, image: pokemonCreated.dataValues.image.toString('base64'), types:types})

    }catch(error){
        res.status(400).json(error.message)
    }
});


pokemonRouter.get("/", async (req, res) => {
    let name = req.query.name || undefined
    try{ 
        // si no hay name
        if (!name) {            
            let allpokemons = await Pokemon.findAll();
            if (allpokemons.length == 0) throw new Error("Tabla vacía");       
            
            allpokemons = await Promise.all(allpokemons.map(async el =>{ 
                const pokemon = await Pokemon.findByPk(el.dataValues.id) ; 
                const types = await pokemon.getTypes(); 
                return {... el.dataValues, types: types.map(type => type.name), db:'db' }}
            ))
       
            const datos = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${12-allpokemons.length}`)
            let pokemonsApi = await Promise.all(datos.data.results.map( async el => {
                let data = await axios(el.url);
                return{
                    id: data.data.id,
                    name: data.data.forms[0].name,
                    image: data.data.sprites.other.dream_world.front_default,
                    hp: data.data.stats[0].base_stat,
                    attack: data.data.stats[1].base_stat,
                    defense: data.data.stats[2].base_stat,
                    velocity: data.data.stats[5].base_stat,
                    height: data.data.height,
                    weight: data.data.weight,
                    types: data.data.types.map(t=>t.type.name),
                    db:'pokeapi'
                }
            }))
                                   
            res.status(200).json( [... allpokemons, ...pokemonsApi] );
        }

        // Si hay name
        else{
            let pokemon = await Pokemon.findOne({ where: { name: {[Op.iLike]:name} }});
            if(pokemon){
                const types = await pokemon.getTypes();
                pokemon = {...pokemon.dataValues, types: types.map(type=>type.name)}
                res.status(200).json([pokemon]);
            }
            else{
                name = req.query.name.toLowerCase()
                console.log(name)
                const data = await axios(`https://pokeapi.co/api/v2/pokemon/${name}/`)
                pokemon = {
                            id: data.data.id,
                            name: data.data.forms[0].name,
                            image: data.data.sprites.other.dream_world.front_default,
                            hp: data.data.stats[0].base_stat,
                            attack: data.data.stats[1].base_stat,
                            defense: data.data.stats[2].base_stat,
                            velocity: data.data.stats[5].base_stat,
                            height: data.data.height,
                            weight: data.data.weight,
                            types: data.data.types.map(t=>t.type.name)
                        }
                res.status(200).json([pokemon]);
            }
        }
    }catch(error){
        res.status(400).json(error.message)
    }
});


pokemonRouter.get("/:idPokemon", async (req, res) => {

    try {
        const id = req.params.idPokemon
        const idContainsLetter = /\D/.test(id)

        if( parseInt(id) > 0 && parseInt(id) < 1010 && !idContainsLetter ){

            let url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    
            const data = await axios(url)
    
            const pokemonApi = {
                id: data.data.id,
                name: data.data.forms[0].name,
                image: data.data.sprites.other.dream_world.front_default,
                hp: data.data.stats[0].base_stat,
                attack: data.data.stats[1].base_stat,
                defense: data.data.stats[2].base_stat,
                speed: data.data.stats[5].base_stat,
                height: data.data.height,
                weight: data.data.weight,
                types: data.data.types.map(t=>t.type.name),
                db: 'pokeapi'
            }
            res.status(200).json(pokemonApi)
        }
        else{
            let pokemonById = await Pokemon.findByPk(id)
            if(pokemonById){
                
                const types = await pokemonById.getTypes(); 
                pokemonById = {...pokemonById.dataValues, types: types.map(type => type.name), db:'db' }

                res.status(200).json(pokemonById)
            }
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
});


pokemonRouter.get("/next/:offset", async (req, res) => {

    try {
        const offset = req.params.offset
        const datos = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=12`)

        const pokemons = await Promise.all(datos.data.results.map(async el =>{
            const data = await axios(el.url)
            return{
                id: data.data.id,
                name: data.data.forms[0].name,
                image: data.data.sprites.other.dream_world.front_default,
                hp: data.data.stats[0].base_stat,
                attack: data.data.stats[1].base_stat,
                defense: data.data.stats[2].base_stat,
                velocity: data.data.stats[5].base_stat,
                height: data.data.height,
                weight: data.data.weight,
                types: data.data.types.map(t=>t.type.name),
                db:'db'
            }
        }))
        res.status(200).json(pokemons)
    } catch (error) {
        res.status(400).json(error.message)
    }
});


pokemonRouter.get("/filter/:filter", async (req, res) => {

    let filter = req.params.filter
    if(req.params.filter == '-') filter = "unknown"

    try{
        let allPokemons = await Promise.all(tipos[filter].map( async pokemon =>{
                const data = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
                return {
                    id: data.data.id,
                    name: data.data.forms[0].name,
                    image: data.data.sprites.other.dream_world.front_default,
                    hp: data.data.stats[0].base_stat,
                    attack: data.data.stats[1].base_stat,
                    defense: data.data.stats[2].base_stat,
                    speed: data.data.stats[5].base_stat,
                    height: data.data.height,
                    weight: data.data.weight,
                    types: data.data.types.map(t=>t.type.name),
                    db: 'pokeapi'
                }
            }))

        res.status(200).json([...allPokemons])
   
    } catch (error) {
        res.status(400).json(error.message)
    }
});


module.exports = pokemonRouter;
