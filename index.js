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

function isFocusable (el) {
  if (isDOMObject(el)) return typeof el.getAttribute('tabindex') === 'string'
}

export default (function () {
  const elMap = new Map()
  let isHideOutline = false

  function setFocusable (el) {
    if (!isDOMObject(el)) return
    el.setAttribute('tabindex', -1)
    if (isHideOutline) el.style.outline = 'none'
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
    if (!isDOMObject(el)) return
    if (!isFunction(callback)) return
    elMap.set(el, {
      callback,
      oldTabIndex: el.getAttribute('tabindex'),
      oldOutline: el.style.outline
    })
    if (!isFocusable(el)) setFocusable(el)
    el.addEventListener('focusin', focusinHandler)
    el.addEventListener('focusout', focusoutHandler)
  }

  function unbind (el) {
    const { oldOutline, oldTabIndex } = elMap.get(el)
    if (oldOutline) el.style.outline = oldOutline
    if (oldTabIndex) el.setAttribute('tabindex', oldTabIndex)
    elMap.delete(el)
    el.removeEventListener('focusin', focusinHandler)
    el.removeEventListener('focusout', focusoutHandler)
  }

  function setIsHideOutline (bool) {
    isHideOutline = bool
  }

  function getIsHideOutline () {
    return isHideOutline
  }

  return {
    bind,
    unbind,
    setIsHideOutline,
    getIsHideOutline
  }
})()
