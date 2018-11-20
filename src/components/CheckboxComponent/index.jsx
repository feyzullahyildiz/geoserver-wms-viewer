import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './style.css'
class CheckboxComponent extends Component {
    render() {
        const { onChange, checked, size, children } = this.props
        return (
            <label className={`my-checkbox-context ${size}`}>
                <div>{children}</div>
                <input type="checkbox"
                    onChange={onChange}
                    checked={checked} />
                <span className="rounded"></span>
            </label>
        );
    }
}


CheckboxComponent.defaultProps = {
    size: ''
}
CheckboxComponent.propTypes = {
    title: PropTypes.string,
    size: PropTypes.oneOf(['small', '']),
}
export {CheckboxComponent};