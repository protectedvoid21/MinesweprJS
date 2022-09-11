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

    reset() {
        this.#time = 0
        this.#timerText.textContent = this.formatText()

        clearInterval(this.#repeat)
    }

    update() {
        this.#time++
        this.#timerText.textContent = this.formatText()   
    }

    formatText() {
        if(this.#time < 10) {
            return '00' + this.#time
        }
        else if(this.#time < 100) {
            return '0' + this.#time
        }
        return this.#time
    }
}