import { getPokemon, getSpeciesPokemon } from './api.js';
import { createChart } from './charts.js';

export const $imgPokemon = document.querySelector('.imgPokemon')
export function setImage(url) {
  $imgPokemon.setAttribute('src', `${url}`)
}

const $description = document.querySelector('#description')
function setDescription(text) {
  $description.textContent = text
}

const $screen = document.querySelector('#screen')
function loader(isLoading = false){
  $imgPokemon.setAttribute('src', ``)
  const img = isLoading ? 'url(./images/loading.gif)' : ''
  $screen.style.backgroundImage = img
}

function set404(){
  setDescription('UPS! Pokemón no encontrado 😢')
  setImage('')
  $screen.style.backgroundImage = 'url(./images/pikachu-sad.gif)'
  setNamePokemon('')
}

const $name = document.querySelector('#name')
function setNamePokemon(name){
  $name.value = name
}

const $light = document.querySelector('#light')
export function speech(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'es'
  speechSynthesis.speak(utterance);
  $light.classList.add('is-animated')

  utterance.addEventListener('end', () =>{

    $light.classList.remove('is-animated')

  })

  return utterance
}


export async function findPokemon(id){

  const {isError, pokemon} = await getPokemon(id)
  if(isError){
    set404()
  }
  const sprites = [pokemon.sprites.front_default]
  const stats = []
  // console.log(pokemon.stats)
  for (const item in pokemon.sprites ){
    if (item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item] !== null){
      sprites.push(pokemon.sprites[item])
    }
  }

  pokemon.stats.map( hability => stats.push(hability.base_stat) )
  const speciesPokemon = await getSpeciesPokemon(id)
  const description = speciesPokemon.flavor_text_entries.find((flavor) => flavor.language.name === 'es')
  return {
    sprites,
    description: description.flavor_text,
    id: pokemon.id,
    name: pokemon.name,
    stats
  }
}

let activeChart = null

export async function setPokemon(id){
  //prender loader
  loader(true)
  const pokemon = await findPokemon(id)
  loader(false)
  //apagar loader
  setImage(pokemon.sprites[0])
  setDescription(pokemon.description)
  setNamePokemon(pokemon.name)
  speech(`${pokemon.name}. ${pokemon.description}`)
  if (activeChart instanceof Chart) {
    activeChart.destroy()
  }
  activeChart = createChart(pokemon.stats)

  return pokemon
}
