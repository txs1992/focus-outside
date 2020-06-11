import Map from './map-shim.js'
const els = []
const elMap = new Map()

function isNotFocusable(el) {
  return isNaN(parseInt(el.getAttribute('tabindex')))
}

function setFocusable(el) {
  el.setAttribute('tabindex', -1)
}

function getNode(target) {
  return els.find((el) => el.contains(target) || el === target)
}

function addClass(el, name) {
  const classList = el.className.split(' ')
  if (classList.indexOf(name) > -1) return
  classList.push(name)
  el.className = classList.join(' ')
}

function removeClass(el, name) {
  const classList = el.className.split(' ')
  const index = classList.indexOf(name)
  if (index < 0) return
  classList.splice(index, 1)
  el.className = classList.join(' ')
}

function focusinHandler({ target }) {
  const node = getNode(target)
  if (!node) return
  const { item, nodeList } = findNodeMap(elMap.entries(), node) || {}
  if (!item) return
  clearTimeout(nodeList.timerId)
}

function focusoutHandler({ target }) {
  const node = getNode(target)
  if (!node) return
  const { item, nodeList } = findNodeMap(elMap.entries(), node) || {}
  if (!item) return
  nodeList.timerId = setTimeout(() => item.callback(target), 10)
}

function findNodeMap(entries, node) {
  for (let i = 0; i < entries.length; i++) {
    const [key, nodeList] = entries[i]
    const item = nodeList.find((item) => item.node === node)
    if (item) return { key, item, nodeList }
  }
}

export function bind(el, callback, key, className = 'focus-outside') {
  if (!key) key = callback
  callback.defaultClass = className
  if (els.indexOf(el) < 0) els.push(el)
  if (elMap.has(key)) {
    const nodeList = elMap.get(key)
    nodeList.push({
      node: el,
      callback,
      oldTabIndex: el.getAttribute('tabindex'),
    })
  } else {
    elMap.set(key, [
      {
        node: el,
        callback,
        oldTabIndex: el.getAttribute('tabindex'),
      },
    ])
  }
  if (isNotFocusable(el)) setFocusable(el)
  addClass(el, className)
  el.addEventListener('focusin', focusinHandler)
  el.addEventListener('focusout', focusoutHandler)
}

export function unbind(target) {
  const { item, key, nodeList } = findNodeMap(elMap.entries(), target) || {}
  if (!item) return

  const { node, callback, oldTabIndex } = item

  const index = els.indexOf(node)
  if (index > -1) els.splice(index, 1)

  removeClass(node, callback.defaultClass)

  if (oldTabIndex) {
    node.setAttribute('tabindex', oldTabIndex)
  } else {
    node.removeAttribute('tabindex')
  }

  node.removeEventListener('focusin', focusinHandler)
  node.removeEventListener('focusout', focusoutHandler)

  const nodeIndex = nodeList.indexOf(item)
  if (index > -1) nodeList.splice(nodeIndex, 1)

  if (!nodeList.length) elMap.delete(key)
}
