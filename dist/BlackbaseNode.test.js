const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
const BlackbaseNode = require('./BlackbaseNode')

describe('BlackbaseNode', function () {
  describe('get() and set()', function () {
    it('Should get() the same value we set()', function () {
      console.log(BlackbaseNode.toString())
      let _node = new BlackbaseNode(321)
      assert.equal(_node.get(), 321)
      _node.set(123)
      assert.equal(_node.get(), 123)
    })
  })
})
