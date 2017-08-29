import React, { Component } from "react";
import classNames from "classnames";

class TabNav extends Component {
    constructor(props) {
        super(props);
    }
    getTabs() {
        const { classPrefix, activeIndex, panels } = this.props;

        return React.Children.map(panels, child => {
            if (!child) return;
            const order = parseInt(child.props.order, 10);
            let classes = classNames({
                [`${classPrefix}-tab`]: true,
                [`${classPrefix}-active`]: activeIndex === order,
                [`${classPrefix}-disabled`]: child.props.disabled
            });
            return <li>{child.props.tab}</li>;
        });
    }

    render() {
        return <ul>{this.getTabs()}</ul>;
    }
}
