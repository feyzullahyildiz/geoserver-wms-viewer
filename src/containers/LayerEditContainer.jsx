import React, { Component } from 'react'
import { ModalComponent } from '../components/ModalComponent'
import { connect } from 'react-redux'
import { changeLayerProperty } from '../redux/actions/action-layers'
class LayerEditContainer extends Component {
    constructor() {
        super()
        this.state = { open: false, url: undefined, title: undefined }
        this.onClose = this.onClose.bind(this)
        this.updateLayer = this.updateLayer.bind(this)
    }
    setLayer(layer) {
        // console.log('layer', layer)
        this._layer = layer

        this.setState({ open: true, url: layer.url, title: layer.title })
    }
    onClose() {
        this._layer = undefined
        this.setState({ open: false, url: undefined, title: undefined })
    }
    onChange(key, val) {
        this.setState({ [key]: val })
    }
    updateLayer() {
        const { chanelayerpropery } = this.props
        const { url, title } = this.state
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
        if (doesSomethingChanged) {
            chanelayerpropery(this._layer, properyObject)
            this.onClose()
        }
    }
    render() {
        const { open, url, title } = this.state
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
            </ModalComponent>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    chanelayerpropery: (layer, property) => dispatch(changeLayerProperty(layer, property)),
})
export default connect(undefined, mapDispatchToProps, null, { withRef: true })(LayerEditContainer)