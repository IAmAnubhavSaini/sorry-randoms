const lib = require('../../lib/SorryNumbers')
const expect = require('chai').expect

describe('SorryNumbers', () => {
    describe('instance sorryNumbers', () => {

        it('.random returns a random number everytime', () => {
            for (let i = 0; i < 10; i++) {
                const actual = typeof lib.sorryNumbers.random()
                const expected = typeof 0
                expect(actual).to.equal(expected)
            }
        })

        it('.positiveRandom returns a positive random number', () => {
            for (let i = 0; i < 10; i++) {
                const actual = lib.sorryNumbers.positiveRandom() > 0
                const expected = true
                expect(actual).to.equal(expected)
            }
        })

        it('.negativeRandom returns a positive random number', () => {
            for (let i = 0; i < 10; i++) {
                const actual = lib.sorryNumbers.negativeRandom() < 0
                const expected = true
                expect(actual).to.equal(expected)
            }
        })

    })
})
