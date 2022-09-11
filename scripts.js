import { Game } from './game.js'

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
})

let game = new Game(10, 10, 10)
document.querySelector('.reset-button').addEventListener('click', () => {
    game.reset()
})

window.onload = game.generateMap()