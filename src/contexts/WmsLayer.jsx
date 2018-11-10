import React, { Component } from 'react';

import Image from 'ol/layer/Image'
import ImageWms from 'ol/source/ImageWMS'

import { MapContext } from './MapContext'
class WmsLayer extends Component {
    getLayerParamsOfSource(layers) {
        return layers.filter(ll => ll.visible === true).map(ll => ll.layerName).join(',')
    }
    shouldComponentUpdate(nextProps) {
        const { visible, opacity, layers, url } = this.props

        if (nextProps.visible !== visible) {
            this._imageLayer.setVisible(nextProps.visible)
        }
        if (nextProps.opacity !== opacity) {
            this._imageLayer.setOpacity(nextProps.opacity)
        }
        if (nextProps.url !== url) {
            this._imageLayer.getSource().setUrl(nextProps.url)
        }
        if (nextProps.layers !== layers) {
            this._imageLayer.getSource().updateParams({ LAYERS: this.getLayerParamsOfSource(nextProps.layers) })
        }

        return false
    }
    componentDidMount() {
        const { url, opacity, visible, layers } = this.props
        if (url && layers) {
            this._imageLayer = new Image({
                source: new ImageWms({
                    url: url,
                    params: { LAYERS: this.getLayerParamsOfSource(layers) },
                    serverType: 'geoserver'
                }),
                opacity: opacity || 1,
                visible: visible
            })
            this._map.addLayer(this._imageLayer)
        }
    }
    componentWillUnmount() {
        this._map.removeLayer(this._imageLayer)
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
export { WmsLayer }