const assert = require('chai').assert

const Freact = require('../src/freact')
const render = require('../src/freactDOM')
require('./mock-browser')

describe('check that createElement creates an element for renderer', () => {
  it('creates an empty div element', () => {
    const element = Freact.createElement('div')
    assert.deepEqual(element, { type: 'div', props: {} })
  })

  it('creates a div element with props', () => {
    const element = Freact.createElement('div', { id: 'wrapper', class: 'container' })
    assert.deepEqual(element, { type: 'div', props: { id: 'wrapper', class: 'container' } })
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
    const element = Freact.createElement(
      'div',
      { id: 'wrapper' },
      Freact.createElement('span'),
      Freact.createElement('p', {}, Freact.createElement('h1'))
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
          { type: 'span', props: {} }
        ]
      }
    })
  })
})
