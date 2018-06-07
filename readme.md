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

## 嘿嘿
> ^_^ 既然都已经来了，就留下 star 呗。

## 为什么要造这个轮子
> 主要原因是在公司的一次小组分享中，组长分享了他项目中遇到的问题：在一个多 iframe 系统中，在 iframe 的上方是一个 dropdown 组件，点击 dropdown 按钮弹出 dropdown list, 这时点击页面的其他区域会关闭 dropdown list。然而如果点击了 iframe 却无法关闭 dropdown list，这是因为 iframe 不会触发 click 事件。 通过研究发现 iframe 会触发 focus 事件，而将 DOM 元素的 tabindex 属性设置为 number, 则该元素变成 focusable 。

## 在线示例
[查看示例](https://jsfiddle.net/_MT_/eywraw8t/25950/)

## 搭建开发环境

```shell
1. fork 项目，然后 clone 到本地
git clone git@github.com:1969290646/focus-outside.git

2. 安装依赖(请确保您的电脑安装了 Node.js)
npm install
```

## 使用

```javascript
// 安装
npm install focus-outside

// 使用
import { bind, unbind } from 'focus-outside'
const elm = document.querySelector('#dorpdown-button')
// 绑定函数
bind(elm, callback)

function callback () {
  console.log('您点击了 dropdown 按钮外面的区域')
  // 清除绑定
  unbind(elm, callback)
}
```

## API

| 函数  | 说明 | 参数 |
| ---  | ---  | --- |
| `bind ` | 为指定元素绑定一个回调函数，当元素失去焦点时触发回调 | `el`：元素节点，`callback `：回调 |
| `unbind` | 取消元素绑定的函数 | `el`：元素节点，`callback`：回调 |

## License

MIT
