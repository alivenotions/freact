function createElement(type, config, ...children) {
  const props = Object.assign({}, config)
  const element = Object.assign({}, { type, props })
  return element
}

module.exports = createElement
