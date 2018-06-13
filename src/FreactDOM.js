function render(element, parentDom) {
  const { type, props } = element

  // create DOM element
  const isTextElement = type === 'TEXT_ELEMENT'
  const dom = isTextElement
    ? document.createTextNode('')
    : document.createElement(type)

  // add event listeners to the element
  const isListener = name => name.startsWith('on')
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, props[name])
    })

  // add attributes to the element
  const isAttribute = name => !isListener(name) && name !== 'children'
  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name]
    })

  // render children
  const childElements = props.children || []
  childElements.forEach(childElement => render(childElement, dom))

  // append to parent
  parentDom.appendChild(dom)
}