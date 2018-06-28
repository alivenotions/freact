function createElement(type, config, ...children) {
  const props = Object.assign({}, config)
  const hasChildren = children.length > 0
  if (hasChildren) {
    const rawChildren = [].concat(...children)
    props.children = rawChildren
      .filter(child => child !== null && child !== false)
      .map(
        child => (child instanceof Object ? child : createTextElement(child))
      )
  }

  return { type, props }
}

function createTextElement(value) {
  return createElement('TEXT_ELEMENT', { nodeValue: value })
}

module.exports = createElement
