<h1 align="center">focus-outside</h1>

<p align="center">
  <a href="http://img.shields.io/travis/txs1992/focus-outside.svg">
    <img src="http://img.shields.io/travis/txs1992/focus-outside.svg" />
  </a>
  <a href="https://img.shields.io/npm/dt/focus-outside.svg">
    <img src="https://img.shields.io/npm/dt/focus-outside.svg" />
  </a>
  <a href="https://img.shields.io/npm/dm/focus-outside.svg">
    <img src="https://img.shields.io/npm/dm/focus-outside.svg" />
  </a>
  <a href="https://img.shields.io/npm/v/focus-outside.svg">
    <img src="https://img.shields.io/npm/v/focus-outside.svg" />
  </a>
  <a href="https://img.shields.io/npm/l/focus-outside.svg">
    <img src="https://img.shields.io/npm/l/focus-outside.svg" />
  </a>
  <a href="https://img.shields.io/node/v/passport.svg">
    <img src="https://img.shields.io/node/v/passport.svg" />
  </a>
</p>

<div align="center">
  <h3>
    <a href="https://github.com/txs1992/focus-outside#readme">
      English
    </a>
    <span> | </span>
    <a href="https://github.com/txs1992/focus-outside/blob/master/docs/zh-cn.md#readme">
      中文
    </a>
  </h3>
</div>

## 为什么要造这个轮子

> 在公司的一次小组分享会上，[组长](https://github.com/coolzjy) 给我们分享了一个他在项目中遇到的一个问题。在一个嵌入 Iframe 的系统中，当我们点击 Dropdown 展开后，再去点击 Iframe 发现无法触发 Dropdown 的 clickOutside 事件，导致 Dropdown 无法收起。[查看示例](https://jsfiddle.net/_MT_/wLkgu614/29/)
>
> 关于 Iframe 为什么不能触发 clickOutside 请阅读这篇文章 [如何优雅解决 Iframe 无法触发 clickOutside](https://txs1992.github.io/mt-blog/blog/click-outside.html)

## API

| 函数 | 说明 | 参数 |
|:--------:|:--------:|:--------:|
| `bind ` | 为指定元素绑定一个回调函数，当元素失去焦点时触发绑定的回调函数 | `el`，`callback `，`key`， `className`，相关参数的的描述，见下面的 `bind 函数 API` |
| `unbind` | 取消元素绑定的函数 | `el`：元素节点，`callback`：回调 |

## bind 函数 API

| 参数 | 类型 | 说明 | 必选 | 默认值 |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| `el` | Element | 需要被绑定的 DOM 元素 | true | - |
| `callback` | Function  | 绑定元素触发 outside 事件时执行的处理函数 | true | - |
| `key` | String/Function | 将需要绑定的元素或者函数进行分组，同一组元素互相点击不会触发 outside 事件，点击这一组元素之外的元素则会触发 outside 事件。| false | `callback` function |
| `className` | String  | The class name to bind to the element | false | "focus-outside" |

## 注意

前面说到过元素变成 focusable 后，当它获取焦点浏览器会给它加上高亮样式，如果你不希望看到和这个样式，你只需要将这个元素的 CSS 属性 outline 设置为 none。focsout-outside 0.5.0 版本的 bind 函数新增 className 参数，为每个绑定的元素添加类名，默认类名是 focus-outside，执行 unbind 函数时候会将这个类名从元素上删除 。

```js
<div id="focus-ele"></div>

// js
const elm = document.querySelector('#focus-ele')
// 默认类名是 focus-outside
focusBind(elm, callback, 'key', 'my-focus-name')

// css
// 如果你需要覆盖所有的默认样式，可以在这段代码放在全局 CSS 中。
.my-focus-name {
  outline: none;
}
```

## 使用 FocusOutside

#### 简单使用

```js
// import { bind, unbidn } from 'focus-outside'
// 建议使用下面这种别名，防止和你的函数命名冲突了。
import { bind: focusBind, unbind: focusUnbind } from 'focus-outside'

// 如果你是使用 CDN 引入的，应该这样使用。
// <script src="https://unpkg.com/focus-outside@0.5.2/lib/index.js"></script>
// const { bind: focusBind, unbind: focusUnbind } = FocusOutside

const elm = document.querySelector('#dorpdown-button')
// 绑定函数
focusBind(elm, callback)

function callback () {
  console.log('您点击了 dropdown 按钮外面的区域')
  // 清除绑定
  focusUnbind(elm)
}
```

[查看在线示例](https://jsfiddle.net/_MT_/z0dejc23/9/)

#### key 的使用

```js
import { bind: focusBind, unbind: focusUnbind } from 'focus-outside'


const btnOne = document.querySelector('#button-one')
const btnTwo = document.querySelector('#button-two')
const btnThree = document.querySelector('#button-three')
const clearBtn = document.querySelector('#button-clear')

// 绑定函数
focusBind(btnOne, callbackOne)
focusBind(btnTwo, callbackTwo)
focusBind(btnThree, callbackThree)
focusBind(clearBtn, callbackOne)

function callbackOne () {
  console.log('如果你点击的是 btnOne 与 btnTwo 将不会触发这个函数')
}

function callbackTwo () {
  console.log('如果触发了，说明你点击了 btnOne 与 btnTwo 之外的元素')
}

function callbackThree () {
  console.log('你点击了 btn-three 之外的区域')
}

function clearCallback() {
  console.log('清除所有按钮的绑定函数')
  focusUnbind(btnOne)
  focusUnbind(btnTwo)
  focusUnbind(btnThree)
  focusUnbind(clearBtn)
}
```

#### 在 Vue 中使用

```js

// outside.js
export default {
  bind (el, binding) {
    focusBind(el, binding.value)
  },

  unbind (el, binding) {
    focusUnbind(el)
  }
}

// xx.vue
<template>
  <div v-outside="handleOutside"></div>
</template>

import outside from './outside.js'

export default {
  directives: { outside },

  methods: {
    handleOutside () {
      // 做点什么...
    }
  }
}
```

[查看在线示例](https://jsfiddle.net/_MT_/57Lmbpe9/)

#### 在 Element 中使用

```js
<el-dropdown
  ref="dropdown"
  trigger="click">
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu
    ref="dropdownContent"
    slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
    <el-dropdown-item>螺蛳粉</el-dropdown-item>
    <el-dropdown-item>双皮奶</el-dropdown-item>
    <el-dropdown-item>蚵仔煎</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

import { bind: focusBind, unbind: focusUnbind } from 'focus-outside'

export default {
  mounted () {
    focusBind(this.$refs.dropdown.$el, this.$refs.dropdown.hide)
    focusBind(this.$refs.dropdownContent.$el, this.$refs.dropdown.hide)
  },

  destoryed () {
    focusUnbind(this.$refs.dropdown.$el)
    focusUnbind(this.$refs.dropdownContent.$el)
  }
}
```

[查看在线示例](https://jsfiddle.net/_MT_/1wb8nk67/57/)

#### 在 ant-design 中使用

```js
import { Menu, Dropdown, Icon, Button } from 'antd'
import { bind: focusBind, unbind: focusUnbind } from 'focus-outside'

function getItems () {
  return [1,2,3,4].map(item => {
    return <Menu.Item key={item}>{item} st menu item </Menu.Item>
  })
}

class MyMenu extends React.Component {
  constructor (props) {
    super(props)
    this.menuElm = null
  }

  render () {
    return (<Menu ref="menu" onClick={this.props.onClick}>{getItems()}</Menu>)
  }

  componentDidMount () {
    this.menuElm = ReactDOM.findDOMNode(this.refs.menu)
    if (this.menuElm && this.props.outside) focusBind(this.menuElm)
  }

  componentWillUnmount () {
    if (this.menuElm && this.props.outside) focusUnbind(this.menuElm)
  }
}

class MyDropdown extends React.Component {

  constructor (props) {
    super(props)
    this.dropdownElm = null
  }

  state = {
    visible: false
  }

  render () {
    const menu = (<MyMenu outside={ this.handleOutside } onClick={ this.handleClick } />)
    return (
      <Dropdown
        ref="divRef"
        visible={this.state.visible}
        trigger={['click']}
        overlay={ menu }>
        <Button style={{ marginLeft: 8 }} onClick={ this.handleClick }>
          Button <Icon type="down" />
        </Button>
      </Dropdown>
    )
  }

  componentDidMount () {
    this.dropdownElm = ReactDOM.findDOMNode(this.refs.divRef)
    if (this.dropdownElm) focusBind(this.dropdownElm, this.handleOutside)
  }

  componentWillUnmount () {
    if (this.dropdownElm) focusUnbind(this.dropdownElm)
  }

  handleOutside = () => {
    this.setState({ visible: false })
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible })
  }
}

ReactDOM.render(
  <MyDropdown/>,
  document.getElementById('container')
)
```

[查看在线示例](https://codepen.io/taoxusheng/pen/KeRyXL?editors=1010)

## 搭建开发环境

```shell
1. fork 项目，然后 clone 到本地
git clone git@github.com:txs1992/focus-outside.git

2. 安装依赖(请确保您的电脑安装了 Node.js)
npm install
```

## License

MIT
