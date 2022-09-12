import { Block } from './block.js'
import { Timer } from './timer.js'
import { formatText } from './formatText.js'

const timeText = document.querySelector('.time-counter')
const remainingMinesText = document.querySelector('.remaining-mines')
const blockContainer = document.querySelector('.block-container')

export class Game {
    #width
    #height
    #remainingMines
    #bombCount
    #started = false
    #blocks = []
    #timer = new Timer(timeText)
    #gameLost = false

    constructor(width, height, bombCount) {
        this.#width = width
        this.#height = height
        this.#bombCount = bombCount
    }

    firstReveal(x, y) {
        this.#timer.start()

        this.#remainingMines = this.#bombCount 
        let leftBombs = this.#bombCount
        const blocksAround = this.getAroundBlocksList(x, y)

        while(leftBombs > 0) {
            const randomX = Math.floor(Math.random() * this.#width)
            const randomY = Math.floor(Math.random() * this.#height)
            
            if(this.#blocks[randomX][randomY].isMine) {
                continue
            }

            let isAround = false
            for(const block of blocksAround) {
                if(block[0] === randomX && block[1] === randomY) {
                    isAround = true
                    break
                }
            }

            if(isAround) {
                continue
            }

            this.#blocks[randomX][randomY].isMine = true
            this.incrementNumbersAround(randomX, randomY)
            leftBombs--
        }
    }

    generateMap() {
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
                blockContainer.children[y * this.#width + x].addEventListener('mouseup', (event) => {
                    if(this.#gameLost) {
                        return
                    }

                    if(event.button == 0) {
                        this.reveal(x, y)
                    }
                    else if(event.button == 2) {
                        this.flag(x, y)
                    }
                })               
            }
        }
    }

    reset() {
        blockContainer.replaceChildren()
        this.#blocks = []
        this.#started = false
        this.#gameLost = false
        this.generateMap()
        this.#timer.reset()
    }

    gameOver() {
        for(let x = 0; x < this.#width; x++) {
            for(let y = 0; y < this.#height; y++) {
                if(this.#blocks[x][y].isMine) {
                    const htmlBlock = this.getHtmlBlock(x, y)
                    htmlBlock.style.backgroundImage = 'url(images/mine.png)'
                    htmlBlock.classList.add('block-clicked')
                    this.#blocks[x][y].isClicked = true
                }
            }
        }

        this.#timer.stop()
        this.#gameLost = true
    }

    getAroundBlocksList(x, y) {
        const blocksList = []
        blocksList.push([x, y])

        if(x > 0) {
            blocksList.push([x - 1, y])
            if(y > 0) {
                blocksList.push([x - 1, y - 1])
            } 
            if(y < this.#height - 1) {
                blocksList.push([x - 1, y + 1])
            }
        }
        if(x < this.#width - 1) {
            blocksList.push([x + 1, y])
            if(y > 0) {
                blocksList.push([x + 1, y - 1])
            }
            if(y < this.#height - 1) {
                blocksList.push([x + 1, y + 1])
            }
        }
        if(y > 0) {
            blocksList.push([x, y - 1])
        }
        if(y < this.#height - 1) {
            blocksList.push([x, y + 1])
        }
        
        return blocksList
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
            if(y < this.#height - 1) {
                this.#blocks[x + 1][y + 1].number++
            }
        }
        if(y > 0) {
            this.#blocks[x][y - 1].number++
        }
        if(y < this.#height - 1) {
            this.#blocks[x][y + 1].number++
        }
    }

    getHtmlBlock(x, y) {
        return blockContainer.children[y * this.#width + x]
    }

    reveal(x, y) {
        if(this.#blocks[x][y].isClicked || this.#blocks[x][y].isFlagged) {
            return
        }
        this.#blocks[x][y].isClicked = true

        const block = this.getHtmlBlock(x, y)
        block.classList.add('block-clicked')

        if(this.#started === false) {
            this.#started = true
            this.firstReveal(x, y)  
        }

        if(this.#blocks[x][y].isMine === true) {
            this.gameOver()
            return
        }
        if(this.#blocks[x][y].number > 0) {
            block.style.backgroundImage = `url(images/${this.#blocks[x][y].number}.png)`
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

    flag(x, y) {
        if(this.#blocks[x][y].isClicked) {
            return
        }

        const htmlBlock = this.getHtmlBlock(x, y)
        const isFlagged = this.#blocks[x][y].isFlagged

        this.#blocks[x][y].isFlagged = !this.#blocks[x][y].isFlagged
        
        if(isFlagged) {
            htmlBlock.style.backgroundImage = 'url(images/block.png)'
            this.#remainingMines++
            remainingMinesText.textContent = formatText(this.#remainingMines)
            return
        }
        this.#remainingMines--
        remainingMinesText.textContent = formatText(this.#remainingMines)
        htmlBlock.style.backgroundImage = 'url(images/flag.png)'
    }
}