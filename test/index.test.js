/**
 * Created by wuhan01 on 2018/7/2.
 */

const should = require('should')
const require2 = require('../lib')

describe('require2', function () {
    it('should return demo module', function () {
        const m1 = require2('@demo/module1')
        const m2 = require2('@demo/module2')
        m1.should.have.property('demo', true)
        m2(m1).should.hava.property('demo', true)
    })
})