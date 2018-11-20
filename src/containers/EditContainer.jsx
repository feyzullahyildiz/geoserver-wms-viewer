import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LayerEditComponent } from '../components/LayerEditComponent'
import { setEditMode } from '../redux/actions/action-config'
import { resetLayers } from '../redux/actions/action-layers'
import { layerAddModalOpenSubject } from '../rxjs/subjects';

class _EditContainer extends Component {
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
        layerAddModalOpenSubject.next()
    }
    render() {
        const { config, oneditmodechange } = this.props
        return (
            <React.Fragment>

                <LayerEditComponent
                    onEditModeChange={() => oneditmodechange(!config.isEdit)}
                    isEditMode={config.isEdit}
                    onLayerAddClicked={this.onLayerAddClicked}
                    onReset={this.onReset}
                />
                
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
const EditContainer = connect(mapStateToProps, mapDispatchToProps)(_EditContainer)
export { EditContainer }