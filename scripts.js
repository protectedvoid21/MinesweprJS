import { Game } from './game.js'

let game = new Game(10, 10, 20)

window.onload = game.generateMap()