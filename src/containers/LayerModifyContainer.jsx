import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeLayerProperty, addNewLayer } from '../redux/actions/action-layers'
import { layerEditModalOpenSubject, layerAddModalOpenSubject } from '../rxjs/subjects';
import { LayerModifyComponent } from '../components/LayerModifyComponent';

class _LayerModifyContainer extends Component {
    constructor() {
        super()
        this.state = { open: false, url: undefined, title: undefined, layersArray: [], layersString: '' }
        this.onClose = this.onClose.bind(this)
        this.editLayerModalOpen = this.editLayerModalOpen.bind(this)
        this.addLayerModalOpen = this.addLayerModalOpen.bind(this)
        layerEditModalOpenSubject.subscribe(this.editLayerModalOpen)
        layerAddModalOpenSubject.subscribe(this.addLayerModalOpen)
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

    editLayerModalOpen(layer) {
        this._layer = layer
        this.setState({
            open: true,
            url: layer.url,
            title: layer.title,
            layersArray: layer.layers.map(l => (l.layerName)),
            layersString: this.convertLayersArrayToString(layer.layers)
        })

        const updateLayer = () => {
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
        this._bottomContent = [{ text: 'Update Layer', onClick: updateLayer }]
        this._title = 'Update Layer'
    }
    addLayerModalOpen() {
        this._layer = undefined
        const defaultUrl = 'http://localhost:8080/geoserver/pois/wms'
        const defaultTitle = 'Pois'
        const defaultLayers = 'poi:istanbul, poi:edirne'
        const defaultListLayers = defaultLayers.split(',').map(t => t.trim())

        this.setState({
            open: true,
            url: defaultUrl,
            title: defaultTitle,
            layersArray: defaultListLayers,
            layersString: 'poi:istanbul, poi:edirne'
        })
        const onAddLayer = () => {
            const { addnewlayer } = this.props
            const { url, title, layersArray } = this.state
            const layers = layersArray.map(l => ({ layerName: l, visible: true }))
            addnewlayer({ url, title, layers })
        }
        const onAddLayerReset = () => {
            this.setState({
                title: '',
                url: '',
                layersString: '',
                layersArray: []
    
            })
        }
        this._bottomContent = [
            { text: 'Add Layer', onClick: onAddLayer },
            { text: 'Clear Inputs', onClick: onAddLayerReset },
    ]
        this._title = 'Add Layer'
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

    render() {
        const { open, url, title, layersString, layersArray } = this.state
        if (!open)
            return null

        return (
            <LayerModifyComponent
                open={open}
                modalTitle={this._title}
                url={url}
                onUrlChange={(elem) => this.onChange('url', elem.target.value)}
                layerTitle={title}
                onLayerTitleChange={(elem) => this.onChange('title', elem.target.value)}
                bottomComponent={this._bottomContent}
                layersArray={layersArray}
                onClose={this.onClose}
                nestedLayersText={layersString}
                onNestedLayersTextChange={(elem) => this.onLayerTextChange(elem.target.value)}
            />
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    chanelayerpropery: (layer, property) => dispatch(changeLayerProperty(layer, property)),
    addnewlayer: (layer) => dispatch(addNewLayer(layer)),
})
const LayerModifyContainer = connect(undefined, mapDispatchToProps)(_LayerModifyContainer)
export { LayerModifyContainer }