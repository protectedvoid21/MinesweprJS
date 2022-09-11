export class Timer {
    #time = 0
    #timerText

    constructor(timerText) {
        this.#timerText = timerText
    }

    resetTimer() {
        this.#timerText.textContent = this.formatText()
        const repeat = setInterval(() => {
            this.updateTimer()
        }, 1000)
    }

    updateTimer() {
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