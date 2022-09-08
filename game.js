import { Block } from './block.js'

export class Game {
    #width
    #height
    #bombCount
    #started = false
    #blocks = []

    constructor(width, height, bombCount) {
        this.#width = width
        this.#height = height
        this.#bombCount = bombCount
    }

    firstReveal(x, y) {
        let leftBombs = this.#bombCount

        while(leftBombs > 0) {
            const randomX = Math.floor(Math.random() * this.#width)
            const randomY = Math.floor(Math.random() * this.#height)

            if(!(randomX === x && randomY === y)) {
                this.#blocks[randomX][randomY].isMine = true
                leftBombs--
            }
        }
        this.reveal(x, y)
    }

    generateMap() {
        const blockContainer = document.querySelector('.block-container')
        const block = document.createElement('div')
        block.classList.add('block')
        block.textContent = String.fromCharCode(160)

        for(let x = 0; x < this.#width; x++) {
            this.#blocks[x] = []
            for(let y = 0; y < this.#height; y++) {
                blockContainer.appendChild(block.cloneNode())
                this.#blocks[x][y] = new Block(false, false)
            }
        }

        for(let x = 0; x < this.#width; x++) {
            for(let y = 0; y < this.#height; y++) {
                blockContainer.children[y * this.#width + x].addEventListener('click', this.reveal(x, y))                
            }
        }
    }

    incrementNumbersAround(x, y) {
        if(x > 0) {
            this.#blocks[x - 1][y].number++
            if(y > 0) {
                this.#blocks[x - 1][y - 1].number++
            } 
            if(y < this.#height - 1) {
                this.#blocks[x - 1][y + 1].number++
            }
        }
        if(x < this.#width - 1) {
            this.#blocks[x + 1][y].number++
            if(y > 0) {
                this.#blocks[x + 1][y - 1].number++
            }
            if(y < height - 1) {
                this.#blocks[x + 1][y + 1].number++
            }
        }
        if(y > 0) {
            this.#blocks[x, y - 1].number++
        }
        if(y < this.#height - 1) {
            this.#blocks[x, y - 1].number++
        }
    }

    reveal(x, y) {
        if(this.#started === false) {
            this.#started = true    
            this.firstReveal(x, y)
            return
        }

        console.log(this.#blocks[x][y].isMine)
        if(this.#blocks[x][y].isMine === true) {
            console.log('You lost')
            return
        }
        if(this.#blocks[x][y].isNumber > 0) {
            this.#blocks[x][y].isClicked = true
            return
        }

        if(x > 0) {
            this.reveal(x - 1, y) //LEFT
            if(y > 0) {
                this.reveal(x - 1, y - 1) //RIGHT LEFT
            } 
            if(y < this.#height - 1) {
                this.reveal(x - 1, y + 1) //RIGHT DOWN
            }
        }
        if(x < this.#width - 1) {
            this.reveal(x + 1, y) //RIGHT
            if(y > 0) {
                this.reveal(x + 1, y - 1) //LEFT TOP
            }
            if(y < this.#height - 1) {
                this.reveal(x + 1, y + 1) //LEFT DOWN
            }
        }
        if(y > 0) {
            this.reveal(x, y - 1) //TOP
        }
        if(y < this.#height - 1) {
            this.reveal(x, y + 1) //DOWN
        }
    }
}