function createElement(type, config, ...children) {
  const props = Object.assign({}, config)
  if(children.length !== 0) props.children = children
  const element = Object.assign({}, { type, props })
  return element
}

module.exports = createElement
