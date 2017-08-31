import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

export default class extends Component {
    static propTypes = {
        tab: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]).isRequired,
        order: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        isActive: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { classPrefix, className, isActive, children } = this.props;
        const classes = classnames({
            [className]: className,
            [`${classPrefix}-panel`]: true,
            [`${classPrefix}-active`]: isActive
        });
        return (
            <div
                role='tabpanel'
                className={classes}
                aria-hidden={!isActive}>
                {children}
            </div>
        );
    }
}

