import React, { Component } from 'react';
import HOC from './HOC';

// create-react-app 暂时不支持decorator
// @HOC
// export default class extends Component {
//     render() {
//         return <input name='name' {...this.props.name} />
//     }
// }

class Input extends Component {
    render() {
        return <input name='name' {...this.props.name} />
    }
}

export default HOC(Input);