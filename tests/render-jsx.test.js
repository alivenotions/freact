const assert = require('chai').assert

const Freact = require('../src/freact')
const render = require('../src/freactDOM')
require('./mock-browser')

describe('check that createElement creates an element for renderer', () => {
  it('creates an empty div element', () => {
    const element = Freact.createElement('div')
    assert.deepEqual(element, { type: 'div', props: {} })
  })

  it('creates a div element with id', () => {
    const element = Freact.createElement('div', { id: 'wrapper' })
    assert.deepEqual(element, { type: 'div', props: { id: 'wrapper' } })
  })

  xit('creates a div element with a single child', () => {
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
})
