
import { setPokemon, setImage, speech } from "./pokedex.js"
import { generateRandomNumber } from "./utils.js"
import './charts.js'

const synth = window.speechSynthesis;
const $pokedex = document.querySelector('.pokedex')
const $form = document.querySelector('#form')
const $next = document.querySelector('#next-pokemon')
const $prev = document.querySelector('#prev-pokemon')
const $random = document.querySelector('#pokemonRandom')
const $nextImg = document.querySelector('#next-image')
const $prevImg = document.querySelector('#prev-image')


$form.addEventListener('submit', handleSubmit)
$next.addEventListener('click', handleNextPokemon)
$prev.addEventListener('click', handlePrevPokemon)
$random.addEventListener('click', handleRandomPokemon)
$nextImg.addEventListener('click', handleNextImg)
$prevImg.addEventListener('click', handlePrevImg)


let activePokemon = null

async function handleSubmit(event) {
  synth.cancel()
  $pokedex.classList.add('is-open')
  event.preventDefault()
  const form = new FormData($form)
  const id = form.get('id').toLocaleLowerCase()


  activePokemon = await setPokemon(id)

}

async function handleNextPokemon() {
  synth.cancel()
  const id = (activePokemon === null || activePokemon.id === 893) ? 1 : activePokemon.id + 1
  activePokemon = await setPokemon(id)
  $name.value = id
}


async function handlePrevPokemon() {
  synth.cancel()
  const id = (activePokemon === null || activePokemon.id === 1) ? 893 : activePokemon.id - 1
  activePokemon = await setPokemon(id)
  $name.value = id
}


async function handleRandomPokemon() {
  synth.cancel()
  const id = generateRandomNumber()
  activePokemon = await setPokemon(id)
  $name.value = id
}


let activeSprite = 0

async function handleNextImg() {
  if (activePokemon === null) return false

  if (activeSprite >= activePokemon.sprites.length - 1) {
    activeSprite = 0
    return setImage(activePokemon.sprites[activeSprite])
  }
  activeSprite = activeSprite + 1
  return setImage(activePokemon.sprites[activeSprite])


}
function handlePrevImg() {
  if (activePokemon === null) return false
  if (activeSprite <= 0) {
    activeSprite = activePokemon.sprites.length - 1
    return setImage(activePokemon.sprites[activeSprite])
  }
  activeSprite = activeSprite - 1
  return setImage(activePokemon.sprites[activeSprite])
}