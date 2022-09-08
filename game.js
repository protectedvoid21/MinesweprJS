export class Game {
    #width;
    #height;
    #bombCount;
    #blocks = [,]

    constructor(width, height, bombCount) {
        this.#width = width
        this.#height = height
    }

    firstReveal(x, y, bombCount) {
        let leftBombs = bombCount

        while(leftBombs > 0) {
            if()
        }
    }

    generateMap() {
        const blockContainer = document.querySelector('.block-container')
        const block = document.createElement('div')
        block.classList.add('block')
        block.textContent = String.fromCharCode(160)

        for(let x = 0; x < this.#width; x++) {
            for(let y = 0; y < this.#height; y++) {
                blockContainer.appendChild(block.cloneNode())
            }
        }
    }

    reveal(x, y) {

    }
}