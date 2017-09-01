import React, { Component } from 'react';

const HOC = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.onNameChange = this.onNameChange.bind(this);
            this.state = { name: '' }
        }
        onNameChange(event) {
            this.setState({
                name: event.target.value
            });
        }

        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onNameChange
                }
            }
            return <WrappedComponent {...this.props} {...newProps} />
        }
    }

};

export default HOC;