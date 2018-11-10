import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditComponent } from '../components/EditComponent'
import { setEditMode } from '../redux/actions/action-config'
import LayerAddContainer from './LayerAddContainer'

class EditContainer extends Component {
    constructor(){
        super()
        this.layerAddContainerRef = React.createRef()
        this.onLayerAddClicked = this.onLayerAddClicked.bind(this)
    }

    onLayerAddClicked(){
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
                />
                <LayerAddContainer ref={this.layerAddContainerRef}/>
            </React.Fragment>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    oneditmodechange: (val) => dispatch(setEditMode(val))
})
const mapStateToProps = (state) => ({
    config: state.config
})
export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)