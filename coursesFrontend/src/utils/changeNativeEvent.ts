function setNativeValue(element: Element | null, value: any) {
  const { set: valueSetter } = Object.getOwnPropertyDescriptor(element, 'value') || {}

  const prototype = Object.getPrototypeOf(element)

  const { set: prototypeValueSetter } = Object.getOwnPropertyDescriptor(prototype, 'value') || {}

  if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value)
  } else if (valueSetter) {
    valueSetter.call(element, value)
  } else {
    throw new Error('The given element does not have a value setter')
  }
}

export const changeNativeEvent = (el: Element | null, value: any) => {
  setNativeValue(el, value)
  el?.dispatchEvent(new Event('input', { bubbles: true }))
}
