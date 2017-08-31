import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { name: 'wangming' };
        this.log('初始化', 'constructor');
    }

    componentWillMount() {
        this.log('渲染前', 'componentWillMount');

    }

    componentDidMount() {
        this.log('渲染后', 'componentDidMount');
        // 此时render会执行两次.
        // this.setState({
        //     name: 'xiaoming'
        // });
    }

    // 组件数据更新
    // 如果组件是由父组件更新 props 而更新的，那么在 shouldComponentUpdate 之前会先执行
    // componentWillReceiveProps 方法
    // 在此方法中调用 setState 是不会二次渲染的。
    componentWillReceiveProps(nextProps) {
        this.log('接受新的props', 'componentWillReceiveProps', nextProps);
    }

    // 默认情况下，React 会渲染所有的节点，因为 shouldComponentUpdate 默认返回 true
    shouldCompoentUpdate(nextProps, nextState) {
        this.log('是否更新', 'shouldComponentUpdate', nextProps, nextState);
        return true;
    }

    // 不能在 componentWillUpdate 中执行 setState
    componentWillUpate(nextProps, nextState) {
        this.log('更新前', 'componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState) {
        this.log('更新后', 'componentDidUpdate');
    }
    // 组件卸载
    componentWillUnmount() {
        this.log('组件卸载', 'componentWillUnmount');
    }

    log(stage, funcName, ...rest) {
        console.table([{ stage, funcName, ...rest }]);
    }
    render() {
        this.log('渲染', 'render');
        const { name } = this.state;
        return <h1>Hello, {name}!</h1>
    }
}

export default App;