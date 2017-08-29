import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

class Tabs extends Component {
    static propTypes = {
        classPrefix: PropTypes.string,
        className: PropTypes.string,
        defaultActiveIndex: PropTypes.number,
        activeIndex: PropTypes.number,
        onChange: PropTypes.func,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    };

    static defaultProps = {
        classPrefix: "tabs",
        onChange: () => {}
    };
    constructor(props) {
        super(props);
        const currentProps = this.props;
        let activeIndex = 0;
        // 对于 activeIndex 来说，既可能来源于使用内部更新的 defaultActiveIndex prop，即我们
        // 不需要外组件控制组件状态，也可能来源于需要外部更新的 activeIndex prop，
        // 我们只能通过切换外组件的状态来更新。
        if ("activeIndex" in currentProps) {
            activeIndex = currentProps.activeIndex;
        } else if ("defaultActiveIndex" in currentProps) {
            activeIndex = currentProps.defaultActiveIndex;
        }
        this.state = {
            activeIndex,
            prevIndex: activeIndex
        };
    }
    render() {
        return <div>{this.props.children}</div>;
    }
}

export default Tabs;
