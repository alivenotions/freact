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
  } else if (element == null) {
    parentDom.removeChild(instance.dom)
    return null
  } else if (instance.element.type === element.type) {
    // if the type of the element is same then
    // update the properties only
    updateDomProperties(instance.dom, instance.element.props, element.props)
    instance.childInstances = reconcileChildren(instance, element)
    instance.element = element
    return instance
  } else {
    const newInstance = instantiate(element)
    parentDom.replaceChild(newInstance.dom, instance.dom)
    return newInstance
  }
}

function reconcileChildren(instance, element) {
  const dom = instance.dom
  const childInstances = instance.childInstances
  const nextChildElements = element.props.children || []
  const newChildInstances = []
  const count = Math.max(childInstances.length, nextChildElements.length)
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i]
    const childElement = nextChildElements[i]
    const newChildInstance = reconcile(dom, childInstance, childElement)
    newChildInstances.push(newChildInstance)
  }
  return newChildInstances
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
  Object.keys(nextProps)
    .filter(isEvent)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[name])
    })

  // add attributes to the element
  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}

module.exports = render
