const assert = require('chai').assert

require('./mock-browser')
const { createElement, render } = require('../src/freact')
/** @jsx createElement */

describe('check the reconciler works correctly', () => {
  beforeEach(function() {
    let root = document.getElementById('root')
    if (!root) {
      root = document.createElement('div')
      root.id = 'root'
      document.body.appendChild(root)
    }
    this.root = root
  })

  it('re-renders jsx div instead of appending', function() {
    const root = this.root
    const element = <div>Tadow!</div>
    render(element, root)
    assert.equal(root.innerHTML, '<div>Tadow!</div>')
    render(element, root)
    assert.equal(root.innerHTML, '<div>Tadow!</div>')
  })

  it('replace div to span', function() {
    const root = this.root
    let element = <div>Tadow!</div>
    render(element, root)
    assert.equal(root.innerHTML, '<div>Tadow!</div>')
    const prevChild = root.firstElementChild
    element = <span>Tadow!</span>
    render(element, root)
    assert.equal(root.innerHTML, '<span>Tadow!</span>')
    const nextChild = root.firstElementChild
    assert.notEqual(prevChild, nextChild)
  })

  it('reuses div', function() {
    const root = this.root
    let element = <div>Tadow!</div>
    render(element, root)
    assert.equal(root.innerHTML, '<div>Tadow!</div>')
  })
})
