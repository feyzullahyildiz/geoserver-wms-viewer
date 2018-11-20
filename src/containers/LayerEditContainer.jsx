import React, { Component } from 'react'
import { ModalComponent } from '../components/ModalComponent'
import { connect } from 'react-redux'
import { changeLayerProperty } from '../redux/actions/action-layers'
import { layerEditModalOpenSubject } from '../rxjs/subjects';

class _LayerEditContainer extends Component {
    constructor() {
        super()
        this.state = { open: false, url: undefined, title: undefined, layersArray: [], layersString: '' }
        this.onClose = this.onClose.bind(this)
        this.updateLayer = this.updateLayer.bind(this)
        this.setLayer = this.setLayer.bind(this)
        layerEditModalOpenSubject.subscribe(this.setLayer)
    }

    convertStringToListLayers(str) {
        return str.split(',').map(l => l.trim()).filter(l => l.length > 0)
    }
    convertLayersArrayToString(arr) {
        return arr.map(l => (l.layerName)).join(', ')
    }
    reset() {
        this._layer = undefined
        this.setState({ url: undefined, title: undefined, layersArray: [], layersString: '' })
    }

    setLayer(layer) {
        this._layer = layer
        this.setState({
            open: true,
            url: layer.url,
            title: layer.title,
            layersArray: layer.layers.map(l => (l.layerName)),
            layersString: this.convertLayersArrayToString(layer.layers)
        })
    }
    onClose() {
        this.reset()
        this.setState({ open: false })
    }
    onChange(key, val) {
        this.setState({ [key]: val })
    }
    onLayerTextChange(layersString) {
        this.setState({
            layersArray: this.convertStringToListLayers(layersString),
            layersString: layersString
        })
    }
    updateLayer() {
        const { chanelayerpropery } = this.props
        const { url, title, layersArray } = this.state
        let doesSomethingChanged = false
        let properyObject = {}
        if (this._layer.url !== url) {
            doesSomethingChanged = true
            properyObject.url = url
        }
        if (this._layer.title !== title) {
            doesSomethingChanged = true
            properyObject.title = title
        }
        if (this._layer.layers.length !== layersArray.length ||
            this._layer.layers.map(l => l.layerName.trim()).join(',') !== layersArray.join(',')) {
                
            doesSomethingChanged = true
            properyObject.layers = layersArray.map(l => ({ layerName: l, visible: true }))
        }
        if (doesSomethingChanged) {
            chanelayerpropery(this._layer, properyObject)
            this.onClose()
        }
    }
    render() {
        const { open, url, title, layersString, layersArray } = this.state
        if (!open)
            return null
        const bottomContent = <button onClick={this.updateLayer}> Update Layer</button>
        return (
            <ModalComponent title="Layer Edit" open={open} onClose={this.onClose} bottomContent={bottomContent}>
                Url: <input type="url"
                    onChange={(val) => this.onChange('url', val.target.value)}
                    value={url}
                    placeholder="type geoserver wms url"
                />

                Name: <input type="text"
                    onChange={(val) => this.onChange('title', val.target.value)}
                    value={title}
                    placeholder="layer name"
                />
                Nested/Inner Layers
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="add-layer-nested-layer-container">
                    <textarea
                        placeholder="we parse nested layers using comma ','"
                        onChange={(val) => this.onLayerTextChange(val.target.value)}
                        value={layersString}>
                    </textarea>
                    <div><ul>
                        {layersArray.map((ll, index) => {
                            return <li key={index}>
                                {ll}
                            </li>
                        })}
                    </ul></div>
                </div>
            </ModalComponent>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    chanelayerpropery: (layer, property) => dispatch(changeLayerProperty(layer, property)),
})
const LayerEditContainer = connect(undefined, mapDispatchToProps)(_LayerEditContainer)
export { LayerEditContainer }