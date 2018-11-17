import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ClearIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'
import RefreshIcon from '@material-ui/icons/Refresh'
class LayerEditComponent extends Component {
    render() {
        const { isEditMode, onEditModeChange, onLayerAddClicked, onReset } = this.props
        return (
            <div>

                {isEditMode ?
                    (<React.Fragment>
                        <Tooltip title="Add" onClick={onLayerAddClicked}>
                            <IconButton color="primary">
                                <AddIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Reset" onClick={onReset}>
                            <IconButton color="primary">
                                <RefreshIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>)
                    : null
                }
                <IconButton aria-label="Edit" onClick={onEditModeChange} color={isEditMode ? 'secondary': 'inherit'} >
                    {isEditMode ?
                        <ClearIcon fontSize="small" />
                        :
                        <EditIcon fontSize="small" />
                    }
                </IconButton>

            </div>
        )
    }
}

export { LayerEditComponent }