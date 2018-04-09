(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.FocusOutside = factory());
}(this, (function () { 'use strict';

function Map() {
  var maps = []; // maps = [[k,v],[k,v]]

  function set(key, value) {
    var result = find(key);
    if (result) {
      maps[result.index][1] = value;
    } else {
      maps.push([key, value]);
      this.size++;
    }
    return this;
  }

  function get(key) {
    var result = find(key);
    return result && result.value;
  }

  function has(key) {
    if (find(key)) return true;
    return false;
  }

  function remove(key) {
    var result = find(key);
    if (!result) return false;
    maps.splice(result.index, 1);
    this.size--;
    return true;
  }

  function clear() {
    maps = [];
    this.size = 0;
  }

  function find(key) {
    for (var i = 0; i < maps.length; i++) {
      if (maps[i][0] === key) return { index: i, value: maps[i][1], key: key };
    }
  }

  function values() {
    return maps.map(function (item) {
      return item[1];
    });
  }

  function entries() {
    return maps;
  }

  return {
    get: get,
    set: set,
    has: has,
    size: 0,
    clear: clear,
    values: values,
    entries: entries,
    'delete': remove
  };
}

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var elMap = new Map();

function isNotFocusable(el) {
  return isNaN(parseInt(el.getAttribute('tabindex')));
}

function setFocusable(el) {
  el.setAttribute('tabindex', -1);
}

function focusinHandler(_ref) {
  var target = _ref.target;

  var _ref2 = findNodeMap(elMap.entries(), target) || {},
      el = _ref2.el,
      nodeList = _ref2.nodeList;

  if (!el) return;
  clearTimeout(nodeList.timerId);
}

function focusoutHandler(_ref3) {
  var target = _ref3.target;

  var _ref4 = findNodeMap(elMap.entries(), target) || {},
      el = _ref4.el,
      key = _ref4.key,
      nodeList = _ref4.nodeList;

  if (!el) return;
  nodeList.timerId = setTimeout(key, 10);
}

function bind(el, callback) {
  if (elMap.has(callback)) {
    var nodeList = elMap.get(callback);
    nodeList.push({
      node: el,
      oldTabIndex: el.getAttribute('tabindex')
    });
  } else {
    elMap.set(callback, [{
      node: el,
      oldTabIndex: el.getAttribute('tabindex')
    }]);
  }
  if (isNotFocusable(el)) setFocusable(el);
  el.addEventListener('focusin', focusinHandler);
  el.addEventListener('focusout', focusoutHandler);
}

function findNodeMap(entries, node) {
  for (var i = 0; i < entries.length; i++) {
    var _entries$i = slicedToArray(entries[i], 2),
        key = _entries$i[0],
        nodeList = _entries$i[1];

    var el = nodeList.find(function (item) {
      return item.node === node;
    });
    if (el) return { key: key, nodeList: nodeList, el: el };
  }
}

function unbind(target) {
  var _ref5 = findNodeMap(elMap.entries(), target) || {},
      el = _ref5.el,
      key = _ref5.key,
      nodeList = _ref5.nodeList;

  if (!el) return;

  var node = el.node,
      oldTabIndex = el.oldTabIndex;


  if (oldTabIndex) {
    node.setAttribute('tabindex', oldTabIndex);
  } else {
    node.removeAttribute('tabindex');
  }

  node.removeEventListener('focusin', focusinHandler);
  node.removeEventListener('focusout', focusoutHandler);

  var index = nodeList.indexOf(el);
  nodeList.splice(index, 1);

  if (!nodeList.length) elMap.delete(key);
}

var index = {
  bind: bind,
  unbind: unbind
};

return index;

})));
