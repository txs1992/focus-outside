import Map from './map-shim.js'
const els = []
const elMap = new Map()
let defaultClass = 'focus-outside'

function isNotFocusable (el) {
  return isNaN(parseInt(el.getAttribute('tabindex')))
}

function setFocusable (el) {
  el.setAttribute('tabindex', -1)
}

function getNode (target) {
  return els.find(el => el.contains(target) || el === target)
}

function addClass (el, name) {
  const classList = el.className.split(' ')
  if (classList.indexOf(name) > -1) return
  classList.push(name)
  el.className = classList.join(' ')
}

function removeClass (el, name) {
  const classList = el.className.split(' ')
  const index = classList.indexOf(name)
  if (index < 0) return
  classList.splice(index, 1)
  el.className = classList.join(' ')
}

function focusinHandler ({ target }) {
  const node = getNode(target)
  if (!node) return
  const { el, nodeList } = findNodeMap(elMap.entries(), node) || {}
  if (!el) return
  clearTimeout(nodeList.timerId)
}

function focusoutHandler ({ target }) {
  const node = getNode(target)
  if (!node) return
  const { el, key, nodeList } = findNodeMap(elMap.entries(), node) || {}
  if (!el) return
  nodeList.timerId = setTimeout(key, 10)
}

function findNodeMap (entries, node) {
  for (let i = 0; i < entries.length; i++) {
    const [key, nodeList] = entries[i]
    const el = nodeList.find(item => item.node === node)
    if (el) return { key, nodeList, el }
  }
}

export function bind (el, callback, className) {
  if (className) defaultClass = className
  if (els.indexOf(el) < 0) els.push(el)
  if (elMap.has(callback)) {
    const nodeList = elMap.get(callback)
    nodeList.push({
      node: el,
      oldTabIndex: el.getAttribute('tabindex')
    })
  } else {
    elMap.set(callback, [{
      node: el,
      oldTabIndex: el.getAttribute('tabindex')
    }])
  }
  if (isNotFocusable(el)) setFocusable(el)
  addClass(el, defaultClass)
  el.addEventListener('focusin', focusinHandler)
  el.addEventListener('focusout', focusoutHandler)
}

export function unbind (target) {
  const { el, key, nodeList } = findNodeMap(elMap.entries(), target) || {}
  if (!el) return

  const { node, oldTabIndex } = el

  const index = els.indexOf(node)
  if (index > -1) els.splice(index)

  removeClass(node, defaultClass)

  if (oldTabIndex) {
    node.setAttribute('tabindex', oldTabIndex)
  } else {
    node.removeAttribute('tabindex')
  }

  node.removeEventListener('focusin', focusinHandler)
  node.removeEventListener('focusout', focusoutHandler)

  const nodeIndex = nodeList.indexOf(el)
  if (index > -1) nodeList.splice(nodeIndex, 1)

  if (!nodeList.length) elMap.delete(key)
}
