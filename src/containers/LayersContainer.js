import React, { Component } from 'react';
import Layers from '../components/Layers'
import store from '../redux/store'

import { changeVisiblity, changeOpacity, changeBaseLayerVisibility } from '../redux/actions/action-layers'
import { connect } from 'react-redux'
class LayersContainer extends Component {
    constructor() {
        super()
        this.state = {}

        this.onLayerClick = this.onLayerClick.bind(this)
        this.changeOpacity = this.changeOpacity.bind(this)
        this.onLayerVisibleChange = this.onLayerVisibleChange.bind(this)

        store.subscribe(() => {
            this.setState({ layers: store.getState().layers })
        })
    }
    onLayerVisibleChange(value, id){
        this.props.dispatch(changeBaseLayerVisibility(value.target.checked, id))
    }
    onLayerClick(e, id, item) {
        this.props.dispatch(
            changeVisiblity(item, id)
        )
    }
    changeOpacity(value, id) {
        this.props.dispatch(changeOpacity(id, value))
    }

    render() {
        return (
            <div>
                <Layers data={this.state.layers}
                    onLayerClick={this.onLayerClick}
                    changeOpacity={this.changeOpacity} 
                    onLayerVisibleChange={this.onLayerVisibleChange}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    layers: state.layers
})
export default connect(mapStateToProps)(LayersContainer)