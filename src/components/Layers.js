import React, { Component } from 'react';
import Slider from 'react-rangeslider'
import { Layer } from './Layer';
import {connect} from 'react-redux'

class Layers extends Component {

    render() {
        let layers
        if (this.props.data !== undefined) {
            layers = this.props.data.map((item, index) => {
                return <div key={index}>
                    <h4> {item.name}</h4>
                    <Layer data={item}  onLayerClick={this.props.onLayerClick}/>
                    <Slider value={item.info.opacity} min={0.1} max={1}
                        step={0.1} onChange={(e) =>this.props.changeOpacity(e, item.id)}
                        tooltip={false} />
                    {this.props.data.length !== index + 1 ? <hr /> : ''}
                </div>
            })
        }

        return (
            <div className="layers">
                <div className="layers-header">Katmanlar</div>
                <div className="layers-body" style={{ minWidth: '150px' }}> {layers} </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    layers : state.layers
})
export default connect(mapStateToProps)(Layers);