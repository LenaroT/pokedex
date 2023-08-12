const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default


    return pokemon
}

function convertPokeApiToPokemonDescription(pokemon, pokemonSpecies){
    const pokemonDescription = new PokemonDescription()
    

    pokemonDescription.number = pokemon.id
    pokemonDescription.name = pokemon.name

    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonDescription.types = types
    pokemonDescription.type = type

    pokemonDescription.sprite = pokemon.sprites.other.dream_world.front_default
    
    if(!pokemonDescription.sprite){
        pokemonDescription.sprite = pokemon.sprites.other['official-artwork'].front_default
    }

    pokemonDescription.animation = pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default

    pokemonDescription.height = pokemon.height
    pokemonDescription.weight = pokemon.weight

    const abilities = pokemon.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] =abilities

    pokemonDescription.abilities = abilities
    pokemonDescription.ability = ability

    const eggGroup = pokemonSpecies.egg_groups.map((eggType) => eggType.name)
    const [eggType] = eggGroup
    
    pokemonDescription.egg_group = eggGroup
    pokemonDescription.egg_type = eggType

    pokemonDescription.habitat = (pokemonSpecies.habitat == null) ? "null" :  pokemonSpecies.habitat.name
    
    return pokemonDescription
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => console.error(error))
}


pokeApi.getPokemon = (offset, limit) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemons = (offset, limit) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDescription = (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

    return fetch(url)
        .then((response) => response.json()) // Converting response to Json
        .then((pokemon) => pokeApi.getPokemonSpecies(pokemon)) 
        .catch((error) => console.error(error))
}

pokeApi.getPokemonTypeDetail = (pokemonType) => {
    return fetch(pokemonType.pokemon.url)
        .then((response) => response.json())
        .then(getPokemon)
        .catch((error) => console.error(error))
}
function cleanTypeArr(){
    typeArr = [];
}

