import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditComponent } from '../components/EditComponent'
import { setEditMode } from '../redux/actions/action-config'
class EditContainer extends Component {
    render() {
        const { config, oneditmodechange } = this.props
        return <EditComponent
            onEditModeChange={() => oneditmodechange(!config.isEdit)}
            isEditMode={config.isEdit}
        />
    }
}
const mapDispatchToProps = (dispatch) => ({
    oneditmodechange: (val) => dispatch(setEditMode(val))
})
const mapStateToProps = (state) => ({
    config: state.config
})
export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)