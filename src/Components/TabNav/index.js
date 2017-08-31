import React, { Component } from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";

class TabNav extends Component {
    static propTypes = {
        panels: PropTypes.node,
        classPrefix: PropTypes.string,
        activeIndex: PropTypes.number
    };
    constructor(props) {
        super(props);
    }

    getTabs() {
        const { panels, classPrefix, activeIndex } = this.props;
        return panels.map(child => {
            if (!child) return;
            const order = parseInt(child.props.order, 10);
            let classes = classnames({
                [`${classPrefix}-tabs`]: true,
                [`${classPrefix}-active`]: activeIndex === order,
                [`${classPrefix}-disabled`]: child.props.disabled
            });
            let events = {};
            if (!child.props.disabled) {
                events = {
                    onClick: this.props.onTabClick.bind(this, order)
                }
            }
            const ref = {};
            if (activeIndex === order) {
                ref.ref = 'activeTab';
            }
            return (
                <li role='tab'
                    aria-disabled={child.props.disabled ? true : false}
                    aria-selected={activeIndex === order ? true : false}
                    {...events}
                    className={classes}
                    key={order}
                    {...ref}>
                    {child.props.tab}
                </li>
            );
        });
    }

    render() {
        const { classPrefix } = this.props;
        const rootClasses = classnames({
            [`${classPrefix}-bar`]: true
        });
        const classes = classnames({
            [`${classPrefix}-nav`]: true
        });
        return (
            <div className={rootClasses} role='tablist'>
                <ul className={classes}>
                    {this.getTabs()}
                </ul>
            </div>
        );
    }
}
