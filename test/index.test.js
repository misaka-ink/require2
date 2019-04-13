/**
 * Created by Xinyi on 2018/7/2.
 */

const should = require('should')

require('../lib')(__dirname) // global require2

describe('require2', function () {
    const a = require2('@a')
    const b = require2('@b/bb')

    it('a require a object should equal to ./b/bb info', function () {
        const aInfo = require('./a').info
        a.info.should.equal(aInfo)
    })

    it ('b require a object should return to ./b/b info', function() {
        const bInfo = require('./b/bb').info
        b.info.should.equal(bInfo)
    })
})