const assert = require('chai').assert

const render = require('../src/FreactDOM')
require('./mock-browser')

describe('check the functionality of the render function', () => {
  beforeEach(() => {
    let root = document.getElementById('root')
    if(!root) {
      root = document.createElement('div')
      root.id = 'root'
      document.body.appendChild(root)
      console.log(document.body.innerHTML)
    }
    this.root = root
  })

  afterEach(() => {
    document.getElementById('root').innerHTML = ''
  })

  it('renders an empty div', () => {
    const element = {
      type: 'div',
      props: {},
    }
    render(element, this.root)
    assert.equal(this.root.innerHTML, '<div></div>')
  })

  it('renders a div with an id', () => {
    const element = {
      type: 'div',
      props: {
        id: 'wrapper',
      }
    }
    render(element, this.root)
    assert.equal(this.root.innerHTML, '<div id="wrapper"></div>')
  })

  it('renders a span with children', () => {
    const element = {
      type: 'span',
      props: {
        children: [
          { type: 'div', props: {} },
          { type: 'span', props: {} },
        ]
      }
    }
    render(element, this.root)
    assert.equal(this.root.innerHTML, '<span><div></div><span></span></span>')
  })

  it('renders a div with 2 levels of nesting', () => {
    const element = {
      type: 'div',
      props: {
        id: 'parent',
        children: [
          { 
            type: 'div',
            props: {
              id: 'child',
              children: [
                { type: 'div', props: {id: 'grand-child'}}
              ]
            }
          }
        ]
      }
    }
    render(element, this.root)
    assert.equal(
      this.root.innerHTML,
      '<div id="parent"><div id="child"><div id="grand-child"></div></div></div>'
    )
  })

  it('render span with a text child', () => {
    const element = {
      type: 'span',
      props: {
        children: [{
          type: 'TEXT_ELEMENT',
          props: { nodeValue: 'Wabalabadubdub!' }
        }]
      }
    }
    render(element, this.root)
    assert.equal(this.root.innerHTML, '<span>Wabalabadubdub!</span>')
  })
})
