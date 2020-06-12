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

## what is this

> A clickOutside library, and it can solve the problem that iframe cannot trigger clickOutside.

## API

| function | descrption | options |
|:--------:|:--------:|:--------:|
| `bind `  | Bind outside handlers to elements | `el`, `callback`, `key`, `className`, for details, see the `Bind Params` table below |
| `unbind` | Clear element binding function | `el` Element Node |


## Bind Params
| parameter | type | descrption | required | default |
|:--------:|:--------:|:--------:|:--------:|:--------:|
| `el` | Element | Element to be bound | true | - |
| `callback` | Function  | The processing function when the outside event is triggered | true | - |
| `key` | String/Function | Divide elements or functions into a group of types. When the same group of elements is clicked, the outside event will not be triggered, while clicking on elements outside the same group will trigger the outside event. | false |`callback` function |
| `className` | String  | The class name to bind to the element | false | "focus-outside" |


## Notice

When the element is bound, `focus-outside` sets the element as a focusable element, which will give it a highlight style when it gets the focus browser. If you don't want to see this style, you only need to put this element The CSS property outline is set to none. The bind function of the focsout-outside version 0.5.0 adds a className parameter, adding a class name for each bound element. The default class name is `focus-outside`, and the class name is removed from the element when the unbind function is executed.

```js
<div id="focus-ele"></div>

// js
const elm = document.querySelector('#focus-ele')
// default classname is focus-outside
focusBind(elm, callback, 'key', 'my-focus-name')

// css
// If you need to override all the default styles, you can put this code in the global CSS.
.my-focus-name {
  outline: none;
}
```

## Use FocusOutside

#### Simple Example

```js
// import { bind, unbidn } from 'focus-outside'
// It is recommended to use the following alias to prevent conflicts with your function naming.
import { bind: focusBind, unbind: focusUnbind } from 'focus-outside'

// If you are using a CDN, you should use it like this.
// <script src="https://unpkg.com/focus-outside@0.5.2/lib/index.js"></script>
// const { bind: focusBind, unbind: focusUnbind } = FocusOutside

const elm = document.querySelector('#dorpdown-button')
// bind function
focusBind(elm, callback)

function callback () {
  console.log('You clicked on the area outside the dropdown button.')
  // clear bind
  focusUnbind(elm)
}
```

[View Online Example](https://jsfiddle.net/_MT_/z0dejc23/9/)

#### Use of key

```js
import { bind: focusBind, unbind: focusUnbind } from 'focus-outside'

const btnOne = document.querySelector('#button-one')
const btnTwo = document.querySelector('#button-two')
const btnThree = document.querySelector('#button-three')
const clearBtn = document.querySelector('#button-clear')

// Binding function and key
focusBind(btnOne, callbackOne, 'button-group')
focusBind(btnTwo, callbackTwo, 'button-group')
focusBind(btnThree, callbackThree, 'custom-button')
focusBind(clearBtn, clearCallback)

function callbackOne () {
  console.log('if you click on btnOne and btnTwo will not trigger this function')
}

function callbackTwo () {
  console.log('if I was triggered, it means you clicked on elements other than btnOne and btnTwo')
}

function callbackThree () {
  console.log('you clicked outside the btn-three')
}

function clearCallback() {
  console.log('Clear all button binding functions')
  focusUnbind(btnOne)
  focusUnbind(btnTwo)
  focusUnbind(btnThree)
  focusUnbind(clearBtn)
}
```

#### Used in Vue

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
      // Do something...
    }
  }
}
```

[View Online Example](https://jsfiddle.net/_MT_/57Lmbpe9/)

#### Used in Element

```js
<el-dropdown
  ref="dropdown"
  trigger="click">
  <span class="el-dropdown-link">
    dropdown menu<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu
    ref="dropdownContent"
    slot="dropdown">
    <el-dropdown-item>Oyster</el-dropdown-item>
    <el-dropdown-item>Gold cake</el-dropdown-item>
    <el-dropdown-item>Lion head</el-dropdown-item>
    <el-dropdown-item>Snail powder</el-dropdown-item>
    <el-dropdown-item>Double skin milk</el-dropdown-item>
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

[View Online Example](https://jsfiddle.net/_MT_/1wb8nk67/57/)

#### Used in Ant Design

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
    if (this.menuElm && this.props.outside) focusBind(this.menuElm, this.props.outside)
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

[View Online Example](https://codepen.io/taoxusheng/pen/KeRyXL?editors=1010)

## Build a development environment

```shell
1. Fork project, then clone to local.
git clone git@github.com:txs1992/focus-outside.git

2. Installation dependencies (make sure your computer has Node.js installed)
yarn install

3. run the project
yarn dev
```

## License

MIT
