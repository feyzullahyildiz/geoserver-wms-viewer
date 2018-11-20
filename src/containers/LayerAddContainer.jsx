import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewLayer } from '../redux/actions/action-layers'
import { ModalComponent } from '../components/ModalComponent'
import { layerAddModalOpenSubject } from '../rxjs/subjects';
class _LayerAddContainer extends Component {
    constructor() {
        super()
        this.defaultUrl = 'http://localhost:8080/geoserver/pois/wms'
        this.defaultTitle = 'Pois'
        this.defaultLayers = 'poi:istanbul, poi:edirne'
        this.defaultListLayers = this.defaultLayers.split(',').map(t => t.trim())

        this.state = {
            open: false,
            title: this.defaultTitle,
            url: this.defaultUrl,
            layers: 'poi:istanbul, poi:edirne',
            listLayers: this.defaultListLayers

        }
        this.onClose = this.onClose.bind(this)
        this.clearInputs = this.clearInputs.bind(this)
        this.addLayer = this.addLayer.bind(this)
        this.showAddLayerModal = this.showAddLayerModal.bind(this)
        layerAddModalOpenSubject.subscribe(this.showAddLayerModal)
    }
    reset() {
        this.setState({
            title: this.defaultTitle,
            url: this.defaultUrl,
            layers: this.defaultLayers,
            listLayers: this.defaultListLayers
        })
    }
    onChange(key, val) {
        if (key === 'layers') {
            let listLayers = val.split(',').map(t => t.trim())
            this.setState({ [key]: val, listLayers })
        } else {
            this.setState({ [key]: val })
        }
    }
    onClose() {
        this.reset()
        this.setState({ open: false })
    }
    clearInputs() {
        this.setState({
            title: '',
            url: '',
            layers: '',
            listLayers: []

        })
    }
    showAddLayerModal() {
        this.setState({ open: true })
    }
    addLayer() {
        const { title, url, listLayers } = this.state
        const { addnewlayer } = this.props
        const layers = listLayers.map(l => ({ visible: true, layerName: l }))
        addnewlayer({ layers, title, url })
        this.onClose()
    }
    render() {
        const { open, title, url, layers, listLayers } = this.state
        if (!open) return null
        const bottomContent = <React.Fragment>
            <button onClick={this.clearInputs}>Clear Inputs</button>
            <button onClick={this.addLayer}>Add Layer</button>
        </React.Fragment>
        return (
            <ModalComponent title="Add Layer" open={open} onClose={this.onClose} bottomContent={bottomContent}>
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
                        onChange={(val) => this.onChange('layers', val.target.value)}
                        value={layers}>
                    </textarea>
                    <div><ul>
                        {listLayers.map((ll, index) => {
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
    addnewlayer: ({ title, url, layers }) => dispatch(addNewLayer({ title, url, layers })),
})
const LayerAddContainer = connect(undefined, mapDispatchToProps)(_LayerAddContainer)
export { LayerAddContainer }