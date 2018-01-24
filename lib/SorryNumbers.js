const _C = require('sorry-constants').ascii

const MAX = _C.numbersMaxSafeInteger

const data = (seed) => [
    Date.now() * 2 / 1000,
    Date.now() * 3,
    Date.now() * 4 / 1000,
    Date.now() * 5,
    Date.now() * 6 / 1000,
    Date.now() * 7,
    Date.now() * 8 / 1000,
    Date.now() * 9,
    Date.now() * 10 / 1000,
    Date.now() * 11,
]

const randomLogic = (acc, curr) => {
    curr = Math.floor(curr)
    return [2, 3, 4, 5, 5, 4, 3, 2].reduce((a, i) => (((acc % MAX + curr % MAX) * (curr % MAX)) * Math.pow(2, Date.now() % 2 ? i : -1 * i) % MAX), 0)
}

/**
 *
 * @param {Function} logic - randomGenerator - Generate a random number as per logic given or a default logic `randomLogic` will be used.
 */
const randomGenerator = (logic = randomLogic, seed = 0) => data(seed).reduce(logic, 0)

/**
 * even - even random number
 */
const even = (mod = 10000000) => {
    let number = randomGenerator()
    while (number % 2 !== 0) {
        number = randomGenerator()
    }
    return number % mod
}

/**
 * odd random number
 */
const odd = (mod = 10000000) => {
    let number = randomGenerator()
    while (number % 2 !== 1) {
        number = randomGenerator()
    }
    return number % mod
}

/**
 * class SorryNumbers - generate random numbers.
 */
class SorryNumbers {
    constructor(options = {}) {
        this.options = options
    }
    /**
     * random(logic, callback):
     * Iterates 36000 (60 \* 60 \* 10) times internally over generation logic; thus a bit slow.
     * Consumes a lot of memory too. This is intentional.
     *
     * @param {*} logic
     * @param {*} callback
     */
    random(mod = _C.numbersMaxSafeInteger, logic, callback) {
        let times = 60 * 60 * 10
        let numbers = []
        let locations = []
        while (times--) {
            numbers.push(randomGenerator(logic) % MAX)
            locations.push(randomGenerator(logic) % MAX)
        }
        const number = numbers[locations[Date.now() % times] % times] % mod
        if (this.options.callback) {
            this.options.callback(number)
        }
        if (callback) {
            callback(number)
        }
        return number
    }

    positiveRandom(logic, callback) {
        let num = this.random(logic)
        num = num > 0 ? num : -1 * num
        if (this.options.callback) {
            this.options.callback(num)
        }
        if (callback) {
            callback(num)
        }
        return num
    }
    negativeRandom(logic, callback) {
        let num = this.random(logic)
        num = num < 0 ? num : -1 * num
        if (this.options.callback) {
            this.options.callback(num)
        }
        if (callback) {
            callback(num)
        }
        return num
    }
}

/**
 * sorryNumbers - instance of SorryNumbers
 */
const sorryNumbers = new SorryNumbers()

module.exports = {
    SorryNumbers,
    sorryNumbers,
    randomGenerator,
    even,
    odd
}
