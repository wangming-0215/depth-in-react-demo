import React, { Component } from "react";
import PropTypes from "prop-types";

class TabPane extends Component {
    static proptypes = {
        tab: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        order: PropTypes.string.isRequired,
        disabled: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }
    getTabPanes() {
        const {
            classPrefix,
            activeIndex,
            prevIndex,
            panels,
            isActive
        } = this.props;
        return React.Children.map(panels, child => {
            if (!child) return;
            const order = parseInt(child.props.order, 10);
            const isActive = activeIndex === order;
            return React.cloneElement(child, {
                classPrefix,
                isActive,
                children: child.props.children,
                key: `tabpane-${order}`
            });
        });
    }
    render() {
        return <div>{this.getTabPanes()}</div>;
    }
}

export default TabPane;
