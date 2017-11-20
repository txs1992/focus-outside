# focus-outside

## 使用

```javascript
import { bind } from 'focus-outside'
const elm = document.querySelector('#dorpdown-button')
bind(elm, callback)
```

## API

| 函数  | 说明 | 参数 |
| ---  | ---  | --- |
| `bind ` | 为指定元素绑定一个回调函数，当元素失去焦点时触发回调 | `el`：元素节点，`callback `：回调 |
| `unbind` | 取消元素绑定的函数 | `el`：元素节点，`callback`：回调 |
