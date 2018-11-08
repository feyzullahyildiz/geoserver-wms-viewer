import React, { Component } from 'react';
// import Layers from '../components/Layers'
// import store from '../redux/store'

// import { changeVisiblity, changeOpacity, changeBaseLayerVisibility } from '../redux/actions/action-layers'
// import { connect } from 'react-redux'

import Image from 'ol/layer/Image'
import ImageWms from 'ol/source/ImageWMS'

import { MapContext } from './MapContext'
class WmsLayersContainer extends Component {

    shouldComponentUpdate(nextProps){
        const {visible, opacity, layers, url} = this.props
        
        if(nextProps.visible !== visible){
            this._imageLayer.setVisible(nextProps.visible)
        }
        if(nextProps.opacity !== opacity){
            this._imageLayer.setOpacity(nextProps.opacity)
        }
        if(nextProps.url !== url){
            this._imageLayer.getSource().setUrl(nextProps.url)
        }
        if(nextProps.layers !== layers){
            this._imageLayer.getSource().udpateParams({LAYERS: nextProps.layers.map(ll => ll.visible === true ? ll.layerName : undefined)})
        }

        return false
    }
    componentDidMount() {
        const { url, opacity, visible, layers } = this.props
        // console.log('props', this.props)
        if (url && visible && layers) {
            this._imageLayer = new Image({
                source: new ImageWms({
                    url: url,
                    params: { LAYERS: layers.map(ll => ll.visible === true ? ll.layerName : undefined) },
                    serverType: 'geoserver'
                }),
                opacity: opacity || 1,
                visible: visible
            })
            // console.log('_imageLayer url', this._imageLayer.getSource().setUrl())
            this._map.addLayer(this._imageLayer)
        }
    }
    componentWillUnmount() {
        this._map.removeLayer(this._imageLayer)
    }
    render() {
        return <MapContext.Consumer>
            {
                (mapcontext) => {
                    this._map = mapcontext.map
                    return null
                }
            }
        </MapContext.Consumer>
    }
}
// const mapStateToProps = (state) => ({
//     layers: state.layers
// })
// export default connect(mapStateToProps)(WmsLayersContainer)
export default WmsLayersContainer