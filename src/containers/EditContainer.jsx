import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditComponent } from '../components/EditComponent'
import { setEditMode } from '../redux/actions/action-config'
import { resetLayers } from '../redux/actions/action-layers'
import LayerAddContainer from './LayerAddContainer'

class EditContainer extends Component {
    constructor() {
        super()
        this.layerAddContainerRef = React.createRef()
        this.onLayerAddClicked = this.onLayerAddClicked.bind(this)
        this.onReset = this.onReset.bind(this)
    }
    onReset() {
        if (window.confirm('your store will be deleted ?')) {
            const { resetlayers } = this.props
            resetlayers()
        }
    }
    onLayerAddClicked() {
        this.layerAddContainerRef.current.getWrappedInstance().showAddLayerModal()
    }
    render() {
        const { config, oneditmodechange } = this.props
        return (
            <React.Fragment>

                <EditComponent
                    onEditModeChange={() => oneditmodechange(!config.isEdit)}
                    isEditMode={config.isEdit}
                    onLayerAddClicked={this.onLayerAddClicked}
                    onReset={this.onReset}
                />
                <LayerAddContainer ref={this.layerAddContainerRef} />
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    oneditmodechange: (val) => dispatch(setEditMode(val)),
    resetlayers: (val) => dispatch(resetLayers(val)),
})
const mapStateToProps = (state) => ({
    config: state.config,
    layers: state.layers,
})
export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)