const assert = require('chai').assert

const Freact = require('../src/freact')
const render = require('../src/freactDOM')
require('./mock-browser')
/** @jsx Freact.createElement */

describe('check that createElement creates an element for renderer', () => {
  it('creates an empty div element', () => {
    const element = <div />
    assert.deepEqual(element, { type: 'div', props: {} })
  })

  it('creates a div element with props', () => {
    const element = <div id="wrapper" class="container" />
    assert.deepEqual(element, {
      type: 'div',
      props: { id: 'wrapper', class: 'container' },
    })
  })

  it('creates a div element with a single child', () => {
    const element = Freact.createElement(
      'div',
      { id: 'wrapper' },
      Freact.createElement('span')
    )
    assert.deepEqual(element, {
      type: 'div',
      props: {
        id: 'wrapper',
        children: [{ type: 'span', props: {} }],
      },
    })
  })

  it('creates a div element with multiple children', () => {
    const element = (
      <div id="wrapper">
        <span />
        <p>
          <h1 />
        </p>
      </div>
    )
    assert.deepEqual(element, {
      type: 'div',
      props: {
        id: 'wrapper',
        children: [
          { type: 'span', props: {} },
          { type: 'p', props: { children: [{ type: 'h1', props: {} }] } },
        ],
      },
    })
  })

  it('creates a div with a text child and a span', () => {
    const element = Freact.createElement(
      'div',
      null,
      'Hola!',
      Freact.createElement('span')
    )
    assert.deepEqual(element, {
      type: 'div',
      props: {
        children: [
          { type: 'TEXT_ELEMENT', props: { nodeValue: 'Hola!' } },
          { type: 'span', props: {} },
        ],
      },
    })
  })
})

describe('check that jsx is being rendered to DOM', () => {
  beforeEach(function() {
    let root = document.getElementById('root')
    if (!root) {
      root = document.createElement('div')
      root.id = 'root'
      document.body.appendChild(root)
    }
    this.root = root
  })

  afterEach(function() {
    document.getElementById('root').innerHTML = ''
  })

  it('renders a div to the DOM', function() {
    const element = <div />
    render(element, this.root)
    assert.equal(this.root.innerHTML, '<div></div>')
  })

  it('renders nested elements in div to the DOM', function() {
    const element = (
      <div id="wrapper">
        <span>Hi</span>
        <p />
        <a href="#">Hi</a>
      </div>
    )
    render(element, this.root)
    assert.equal(
      this.root.innerHTML,
      '<div id="wrapper"><span>Hi</span><p></p><a href="#">Hi</a></div>'
    )
  })
})
