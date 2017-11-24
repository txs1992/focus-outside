import Map from './map-shim.js'

const elMap = new Map()

function isNotFocusable (el) {
  return isNaN(parseInt(el.getAttribute('tabindex')))
}

function setFocusable (el) {
  el.setAttribute('tabindex', -1)
}

function focusinHandler ({ currentTarget }) {
  const option = elMap.get(currentTarget)
  clearTimeout(option.timerId)
}

function focusoutHandler ({ currentTarget }) {
  const option = elMap.get(currentTarget)
  option.timerId = setTimeout(option.callback, 0)
}

function bind (el, callback) {
  elMap.set(el, {
    callback,
    oldTabIndex: el.getAttribute('tabindex')
  })
  if (isNotFocusable(el)) setFocusable(el)
  el.addEventListener('focusin', focusinHandler)
  el.addEventListener('focusout', focusoutHandler)
}

function unbind (el) {
  const { oldTabIndex } = elMap.get(el)
  if (oldTabIndex) {
    el.setAttribute('tabindex', oldTabIndex)
  } else {
    el.removeAttribute('tabindex')
  }
  elMap.delete(el)
  el.removeEventListener('focusin', focusinHandler)
  el.removeEventListener('focusout', focusoutHandler)
}

export default {
  bind,
  unbind
}
