import { Game } from './game.js'

let game = new Game(10, 10, 10)

window.onload = game.generateMap()