const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('assert')
import BlackbaseNode from '../src/BlackbaseNode'

describe('BlackbaseNode', () => {
  describe('constructor()', () => {
    it('Should get() the same value we declare in costructor()', () => {
      let _node = new BlackbaseNode(321)
      assert.equal(_node.get(), 321)
    })
    it('Should return null when we do not declare nothing', () => {
      let _node = new BlackbaseNode()
      assert.equal(_node.get(), null)
    })
  })
  describe('get() and set()', () => {
    it('Should get() the same value we set()', () => {
      let _node = new BlackbaseNode()
      _node.set(123)
      assert.equal(_node.get(), 123)
    })
    it('Value should be immutable', () => {
      let _val = {
        test: 123
      }
      let _node = new BlackbaseNode()
      _node.set(_val)
      assert.equal(_node.get() === _val, false)
    })
    it('set([Object]) should create children BlackbaseNodes', () => {
      let _node = new BlackbaseNode({
        test: 123
      })
      assert.equal(_node.get().test instanceof BlackbaseNode, true)
    })
    it('parentNode.get().childNode should be the same as parentNode.childNode.get()', () => {
      let _node = new BlackbaseNode({
        childNode: 123
      })
      assert.equal(_node.get().childNode.get(), _node['childNode'].get())
    })
  })
  describe('events', () => {
    it('node.once() should fire only once', () => {
      let _node = new BlackbaseNode(123)
      let _counter = 0
      _node.on('get', () => {
        _counter++
      })
      _node.get()
      _node.get()
      assert.equal(_counter, 2)
    })
    it('node.once() should fire only once', () => {
      let _node = new BlackbaseNode(123)
      let _counter = 0
      _node.once('get', () => {
        _counter++
      })
      _node.get()
      _node.get()
      assert.equal(_counter, 1)
    })
    it('node.on(\'get\') should fire with current value as a argument', (done) => {
      let _node = new BlackbaseNode(123)
      let _counter = 0
      _node.on('get', (_currentValue) => {
        if (_currentValue === 123) {
          done()
        }
      })
      _node.get()
    })
    it('node.on(\'set\') should fire with old value and new value as a args', (done) => {
      let _node = new BlackbaseNode(123)
      _node.on('set', (_oldValue, _newValue) => {
        if (_oldValue == 123 && _newValue == 0) {
          done()
        } else {
          done('something went wrong')
        }
      })
      _node.set(0)
    })
    it('node.off() with no listener specified should remove all listeners', () => {
      let _node = new BlackbaseNode(123)
      let _counter = 0
      _node.on('get', () => {
        _counter++
      })
      _node.on('get', () => {
        _counter++
      })
      _node.off('get')
      _node.get()
      assert.equal(_counter, 0)
    })
    it('node.off() with a listener specified should remove only specified listener', () => {
      let _node = new BlackbaseNode(123)
      let _counter = 0
      let _callback1 = () => {
        _counter++
      }
      let _callback2 = () => {
        _counter++
      }
      _node.on('get', _callback1)
      _node.on('get', _callback2)
      _node.off('get', _callback1)
      _node.get()
      assert.equal(_counter, 1)
    })
  })
})
