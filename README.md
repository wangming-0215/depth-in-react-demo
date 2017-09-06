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

## 生命周期相关 ##
1. 组件挂在或卸载时

![](/images/1.png)

![](/images/2.png)

2. 数据更新过程: 指的是父组件向下传递 props 或组件自身执行 setState 方法时发生的一系列更新
动作

### React 声明周期整体流程 ###
![](/images/3.png)

### React受控组件更新state的流程 ###

1. 可以通过在初始化state中设置表单的默认值.
2. 每当表单的值发生变化是,调用onchange时间处理器
3. 事件处理器通过合成事件对象e拿到改变后的状态,并更新应用的state.
4. setState触发视图的重新渲染,完成表单组件值的更新.

### 受控组件和非受控组件对比 ###
非受控组件通过defaultValue或者defaultChecked来设置表单的默认值,它仅会被渲染一次,在后续的渲染时并不起作用.
非受控组件的状态并不会受应用状态的控制,应用中也多了局部组件状态,而受控组件的值来自于组件的state.
- 性能上问题
表单每次变化,都会调用一次onChange事件处理器,所以受控组件在性能上有一些损耗,非受控组件不会出现这些问题.
- 是否需要事件绑定
受控组件需要为每个组件绑定一个change事件,某些简单的情况下,可以用一个处理器处理多个表单域.

### CSS模块化遇到的问题 ###

- 全局污染: CSS使用全局选择器机制设置样式,方便了重写样式的同时可能会发生延时被错误覆盖的现象.Web Components标准中的Shadow DOM能彻底解决这个问题,但它把样式彻底局部化,造成外部无法重写样式,损失了灵活性.
- 命名混乱
- 依赖管理不彻底: 组件应该是相互独立的, 引入一个组件式, 应该只引入它所需要的CSS样式. 如果能让JavaScript来管理CSS依赖是很好的解决办法, webpack的css-loader提供了这种能力
- 无法共享变量
- 代码压缩不彻底

CSS Modules实现了一下几点:
- 所有样式都是局部化的, 解决了命名冲突和全局污染问题
- class名的生成规则配置灵活, 可以以此来压缩class名
- 只需引用组件的JavaScript, 就能搞定组件所有的JavaScript和CSS
- 依然是CSS, 学习成本几乎为零

### 父组件向子组件通信 ###

父组件通过 `props`向子组件传递需要的信息.

### 子组件向父组件通信 ###

- 利用回调函数: 这是JavaScript灵活方便之处, 这样就可以拿到运行时的状态
- 利用自定义事件机制: 这种方法更通用, 使用也广泛.设计组件式,可考虑加入时间机制往往可以达到简化组件api的目的.

### 跨级组件通行 ###

使用context来实现跨级父子组件的通信.
![](/images/4.png)

### 没有嵌套关系的组件通信 ###

自定义事件机制: `EventEmitter`.
**Note**: 在componentDidMount事件中,如果组件挂在完成,再订阅事件,在组件卸载的时候, componentWillUnmount事件中取消事件订阅.

一般情况下, 自检之间的通信尽可能保持简介. 如果说程序中出现多级传递或者跨级传递是,那么首先要重新审视一下是否有更合理的方式.

### 高阶组件 ###

当react组件被包裹是,高阶组件会返回一个增强的react组件.

实现高阶组件的两种方式:
- 属性代理: 高阶组件通过被包裹的react组件来操作props
- 反向继承: 高阶组件继承于被包裹的react组件.

### react主要思想 ###

通过构建可复用组件来构建用户界面。

### 组件的生命周期在不同状态下的执行顺序 (react-lifecycle mixin) ###

- 当首次挂载组件时，按顺序执行`getDefaultProps`, `getInitialState`, `componentWillMount`, `render`和`componentDidMount`。
- 当下载组件时， 执行`componentWillUnmount`。
- 当重新挂载组件时，按顺序执行`getInitialState`, `componentWillMount`, `render`和`componentDidMount`，但并执行`getDefaultProps`
- 当再次渲染组件时，组件接受到更新状态，此时按顺序执行`componentWillReveiveProps`, `shouldComponentUpdate`, `componentWillUpdate`, `render`和`componentDidUpdate`

生命周期主要分三个阶段管理： `MOUNTING`, `REVEIVE_PROPS`, `UNMOUNTING`,对应三中方法：`mountComponent`, `updateComponent` , `unmountComponent`。

- 阶段一：MOUNTING

  `mountComponent`负责管理生命周期中的`getInitialState`, `componentWillMount`, `render`和`componentDidMount`
  `getDefaultProps`是通过构造函数管理的，整个生命周期中最先执行的，而且只执行一次。

  ***Note*** : `componentWillMount`中执行`setState()`不会触发重新渲染，而是合并state,此时无法获取到更新后的state，需要`render`之后才可以获取到
  ![](/images/5.png)

- 阶段二：RECEIVE_PROPS

  `updateComponent`负责管理生命周期中的`componentWillReceiveProps`, `shouldComponentUpdate`, `componentWillUpdate`, `render`和`componentDidUpdate`

  ***Note*** : `componentWillUpdate`中执行`setState()`不会触发重新渲染，而是合并state,此时无法获取到更新后的state，需要`render`之后才可以获取到.

  ***NOTE***: 禁止在`shouldComponentUpdate`和`componentWillUpdate`中调用`setState`，这会造成循环调用，直至耗光浏览器内存后崩溃。
  ![](/images/6.png)

- 阶段三：UMOUNTING

  `unmountComponent`负责管理`componentWillUnmount`,重置所有相关参数，更新队列以及更新状态

***Note*** : 尽可能使用无状态组件

### react diff 算法的三个策略 ###
 - web UI中dom节点跨层级操作特别少，可以忽略不计。
 - 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
 - 对于同一层级的一组子节点，它们可以通过唯一id进行区分。