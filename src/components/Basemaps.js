import React, { Component } from 'react';
import Slider from 'react-rangeslider'

class Basemaps extends Component {
    render() {
        return (
            <div className="basemaps">
                <div className="basemaps-header">Altıklar</div>
                <div className="basemaps-slider">
                    <Slider min={0.1} max={1} value={this.props.baseMapOpcity}
                        step={0.1} onChange={this.props.onBasemapOpacityChange}
                        tooltip={false} />
                </div>
                <div className="basemaps-body">{this.props.data}</div>
            </div>
        );
    }
}

export default Basemaps;