import Map from './map-shim'
const els: any[] = []
const elMap = new Map()

function isNotFocusable(el: Element) {
  return isNaN(parseInt(el.getAttribute('tabindex') as string))
}

function setFocusable(el: Element) {
  el.setAttribute('tabindex', '-1')
}

function getNode(target: EventTarget) {
  return els.find((el) => el.contains(target) || el === target)
}

function addClass(el: Element, name: string) {
  const classList = el.className.split(' ')
  if (classList.indexOf(name) > -1) return
  classList.push(name)
  el.className = classList.join(' ')
}

function removeClass(el: Element, name: string) {
  const classList = el.className.split(' ')
  const index = classList.indexOf(name)
  if (index < 0) return
  classList.splice(index, 1)
  el.className = classList.join(' ')
}

function focusinHandler(event: Event) {
  const node = getNode(event.target as any)
  if (!node) return
  const { item, nodeList } = findNodeMap(elMap.entries(), node) || {}
  if (!item) return
  clearTimeout(nodeList.timerId)
}

function focusoutHandler(event: Event) {
  const node = getNode(event.target as any)
  if (!node) return
  const { item, nodeList } = findNodeMap(elMap.entries(), node) || {}
  if (!item) return
  nodeList.timerId = setTimeout(() => item.callback(event.target as any), 10)
}

function findNodeMap(entries: any[], node: Element): any {
  for (let i = 0; i < entries.length; i++) {
    const [key, nodeList] = entries[i]
    const item: any = nodeList.find((item: any) => item.node === node)
    if (item) return { key, item, nodeList }
  }
}

export function bind(el: any, callback: any, key?: string, className: string = 'focus-outside') {
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

export function unbind(el: any) {
  const { item, key, nodeList } = findNodeMap(elMap.entries(), el) || {}
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
