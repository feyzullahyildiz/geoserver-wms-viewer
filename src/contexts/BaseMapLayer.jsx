import React, { Component } from 'react'
import olTileLayer from 'ol/layer/Tile';
import olTileImage from 'ol/source/TileImage';
import { MapContext } from './MapContext'

export class BaseMapLayer extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        const { url, opacity, visible } = this.props

        if (nextProps.visible !== visible) {
            this._basemapLayer.setVisible(nextProps.visible)
        }
        if (nextProps.opacity !== opacity) {
            this._basemapLayer.setOpacity(nextProps.opacity)
            
            if(nextProps.opacity === 0){
                this._basemapLayer.setVisible(false)
            }
            else if(nextProps.opacity > 0 && visible === true){
                this._basemapLayer.setVisible(true)
            } 
        }
        if (nextProps.url !== url) {
            this._basemapLayer.getSource().setUrl(nextProps.url)
        }

        return false
    }
    componentDidMount() {
        const { url, opacity, visible } = this.props
        if (!this._basemapLayer) {
            this._basemapLayer = new olTileLayer({
                zIndex: -1,
                source: new olTileImage({ url }),
                visible: visible,
                opacity: opacity
            })
            this._map.addLayer(this._basemapLayer)
        }
    }
    componentWillUnmount() {
        if(this._map && this._basemapLayer){
            this._map.removeLayer(this._basemapLayer)
        }
    }
    render() {
        return (<MapContext.Consumer>
            {
                (mapcontext) => {
                    this._map = mapcontext.map
                    return null
                }
            }
        </MapContext.Consumer>)
    }
}
