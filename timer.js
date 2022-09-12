import { formatText } from "./formatText.js"

export class Timer {
    #time = 0
    #timerText
    #repeat

    constructor(timerText) {
        this.#timerText = timerText
    }

    start() {
        this.#repeat = setInterval(() => {
            this.update()
        }, 1000)
    }

    stop() {
        clearInterval(this.#repeat)
    }

    reset() {
        this.#time = 0
        this.#timerText.textContent = formatText(this.#time)

        clearInterval(this.#repeat)
    }

    update() {
        this.#time++
        this.#timerText.textContent = formatText(this.#time)   
    }
}