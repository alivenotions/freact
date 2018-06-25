let rootInstance = null

function render(element, container) {
  const prevInstance = rootInstance
  const nextInstance = reconcile(container, prevInstance, element)
  rootInstance = nextInstance
}

function reconcile(parentDom, instance, element) {
  if (instance == null) {
    const newInstance = instantiate(element)
    parentDom.appendChild(newInstance.dom)
    return newInstance
  } else {
    const newInstance = instantiate(element)
    parentDom.replaceChild(newInstance.dom, instance.dom)
    return newInstance
  }
}

function instantiate(element) {
  const { type, props } = element

  // Create DOM element
  const isTextElement = type === 'TEXT_ELEMENT'
  const dom = isTextElement
    ? document.createTextNode('')
    : document.createElement(type)

  updateDomProperties(dom, [], props)

  // instantiate and append children
  const childElements = props.children || []
  const childInstances = childElements.map(instantiate)
  const childDoms = childInstances.map(childInstance => childInstance.dom)
  childDoms.forEach(childDom => dom.appendChild(childDom))

  const instance = { dom, element, childInstances }
  return instance
}

function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = name => name.startsWith('on')
  const isAttribute = name => !isEvent(name) && name !== 'children'

  // Remove event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[name])
    })

  // Remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = null
    })

  // add event listeners to the element
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
}
