import debounce from 'lodash-es/debounce'

let callback
let mountElement

function isFunction (callback) {
  const isFn = typeof callback === 'function'
  if (!isFn) error('function', callback)
  return isFn
}

function isDOMObject (el) {
  const isDom = el instanceof HTMLElement
  if (!isDom) error('HTMLElement', el)
  return isDom
}

function error (expect, got) {
  console.error(`FocusOutside: expects a ${expect} value, got ${got}`)
}

function setFocusable (el) {
  if (!isDOMObject(el)) return
  el.setAttribute('tabindex', -1)
  el.style.outline = 'none'
}

function focusinHandler (e) {
  if (mountElement.contains(e.target)) focusDebounce.cancel()
  if (!mountElement.contains(e.target)) console.log(e.target)
}

function focusoutHandler (e) {
  callback(e)
}

const focusDebounce = debounce(focusoutHandler, 0)

function isFocusable (el) {
  if (isDOMObject(el)) return typeof el.getAttribute('tabindex') === 'string'
}

export function unbind (el) {
  el.removeEventListener('focusin', focusinHandler, false)
  el.removeEventListener('focusout', focusDebounce, false)
}

export function bind (el, fn) {
  if (!isDOMObject(el)) return
  if (!isFunction(fn)) return
  if (!isFocusable(el)) setFocusable(el)
  callback = fn
  mountElement = el
  unbind(el)
  el.addEventListener('focusin', focusinHandler, false)
  el.addEventListener('focusout', focusDebounce, false)
}
