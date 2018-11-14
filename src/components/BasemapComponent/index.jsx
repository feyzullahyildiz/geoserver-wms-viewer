import React, { Component } from 'react'
import './style.css'
export class BasemapComponent extends Component {
    render() {
        const { opacity, onOpacityChange, children } = this.props
        return (
            <div className="basemap-component">
                {children}
                <input className="basemap-opacity-range" onChange={(e) =>onOpacityChange(e.target.value)}
                    value={opacity}
                    type="range"
                    min={0} max={1} step={0.1}
                />
            </div>
        )
    }
}
export class BasemapItemComponent extends Component {
    render() {
        const { visible, onClick, children } = this.props

        return (
            <div className="basemap-item">
                <button className={visible ? 'active' : ''} onClick={onClick}>{children}</button>
            </div>
        )
    }
}
