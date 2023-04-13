const pokemonRouter = require("express").Router();
const {createPokemon, getAllPokemons, getPokemonById, nextList, filter} = require('../controllers/controllers')

pokemonRouter.post('/', createPokemon)
pokemonRouter.get('/', getAllPokemons)
pokemonRouter.get('/:idPokemon', getPokemonById)
pokemonRouter.get('/next/:offset', nextList)
pokemonRouter.get('/filter/:filter', filter)

module.exports = pokemonRouter;
