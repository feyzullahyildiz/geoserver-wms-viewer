import React, { Component } from 'react';
import './style.css'
class CheckboxComponent extends Component {
    render() {
        return (
            <label className="my-checkbox-context">
                <div>{this.props.children}</div>
                <input type="checkbox"
                    onChange={this.props.onChange}
                    checked={this.props.checked} />
                <span className="rounded"></span>
            </label>
        );
    }
}

export default CheckboxComponent;