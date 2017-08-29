# depth-in-react-demo
学习《深入react技术栈》

## React.cloneElement

```js
React.cloneElement(
  element,
  [props],
  [...children]
)
```

以 element 作为起点，克隆并返回一个新的React元素(React Element)。生成的元素将会拥有原始元素props与新props的浅合并。新的子级会替换现有的子级。来自原始元素的 key 和 ref 将会保留。

React.cloneElement() 几乎相当于：

```html
<element.type {...element.props} {...props}>{children}</element.type>
```

如果组件是由父组件更新 props 而更新的，那么在 shouldComponentUpdate 之前会先执行
componentWillReceiveProps 方法。此方法可以作为 React 在 props 传入后，渲染之前 setState 的
机会。在此方法中调用 setState 是不会二次渲染的