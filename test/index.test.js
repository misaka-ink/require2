/**
 * Created by Xinyi on 2018/7/2.
 */

const should = require('should')
const require2 = require('../lib')

describe('require2', function () {
    const demoResult = {'demo': true}
    const m1 = require2('@demo/module1')
    const m2 = require2('@demo/module2')

    it('require a object should equal to the target result', function () {
        m1.should.deepEqual(demoResult)
    })

    it ('require a functon should return equal to the target result', function() {
        m2(m1).should.deepEqual(demoResult)
    })
})