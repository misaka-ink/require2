/**
 * Created by Xinyi on 2018/7/2.
 */

const should = require('should')

require('../lib') // global require2

describe('require2', function () {
    const a = require2('@a')
    const b = require2('@b/bb')

    it('a require a object should equal to ./b/bb info', function () {
        const aInfo = require('./a').info
        a.info.should.equal(aInfo)
    })

    it('b require a object should return to ./b/b info', function () {
        const bInfo = require('./b/bb').info
        b.info.should.equal(bInfo)
    })
})

describe('initital require2 in submoudle', function () {
    const a = require2('@a')

    it('a require a object should equal to ./b/bb info', function () {
        const aInfo = require('./a').info
        a.info.should.equal(aInfo)
    })
})

describe('NODE_ENV map config', () => {
    it('should return json value of the \'demo.json\'', function () {
        const json = require2('./json/demo.json')
        json.a.should.equal(1)
    })

    it('should return json value of the \'demo.prod.json\'', function () {
        process.env.NODE_ENV = 'production'
        const json = require2('./json/demo.json')
        json.a.should.equal(2)
    })
})