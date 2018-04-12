import Map from './map-shim.js'

const els = []
const elMap = new Map()

function isNotFocusable (el) {
  return isNaN(parseInt(el.getAttribute('tabindex')))
}

function setFocusable (el) {
  el.setAttribute('tabindex', -1)
}

function focusinHandler ({ target }) {
  const { el, nodeList } = findNodeMap(elMap.entries(), target) || {}
  if (!el) return
  clearTimeout(nodeList.timerId)
}

function focusoutHandler ({ target }) {
  const node = els.find(el => el.contains(target) || el === target)
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

export function bind (el, callback) {
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
  el.addEventListener('focusin', focusinHandler)
  el.addEventListener('focusout', focusoutHandler)
}

export function unbind (target) {
  const { el, key, nodeList } = findNodeMap(elMap.entries(), target) || {}
  if (!el) return

  const { node, oldTabIndex } = el

  if (oldTabIndex) {
    node.setAttribute('tabindex', oldTabIndex)
  } else {
    node.removeAttribute('tabindex')
  }

  node.removeEventListener('focusin', focusinHandler)
  node.removeEventListener('focusout', focusoutHandler)

  const index = nodeList.indexOf(el)
  nodeList.splice(index, 1)

  if (!nodeList.length) elMap.delete(key)
}
