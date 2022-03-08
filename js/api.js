const BASE_API = 'https://pokeapi.co/api/v2/'


export  async function getPokemon(id){
  const response = await fetch(`${BASE_API}pokemon/${id}/`)

  if(!(response.ok)){
    return {
      isError: true,
      pokemon: null,
    }
  }
  const pokemon = await response.json()
  return {
    isError: false,
    pokemon
  }

}


export  async function getSpeciesPokemon(id){
  const response = await fetch(`${BASE_API}pokemon-species/${id}`)
  const data = await response.json()
  return data

}