import React, { Component } from 'react';

// import 'react-rangeslider/lib/index.css'
class Layers extends Component {
    render() {
        let layers
        if(this.props.data !== undefined)
        layers = this.props.data.map((item, index) => {
            return <div key={index}>
                <a className={item.layer.visible === true ? 'active' : ''}
                    key={index} href="#"
                    onClick={(e) => this.props.onLayerVisibilityChange(e, item)} >
                    {item.layer.layerName.split(':')[1]}
                </a>
            </div>
        })

        return (
            <div className="layers">
                <div className="layers-header">Katmanlar</div>
                <div className="layers-body"> {layers} </div>
            </div>
        );
    }
}

export default Layers;