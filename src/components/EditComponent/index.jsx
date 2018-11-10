import React, { Component } from 'react'

class EditComponent extends Component {
    render() {
        const { isEditMode, onEditModeChange, onLayerAddClicked } = this.props
        return (
            <div>
                <button onClick={onEditModeChange}> {isEditMode ? 'Close' : 'Edit'} </button>
                {isEditMode ?
                    <button onClick={onLayerAddClicked}> Add </button>
                    : null
                }

            </div>
        )
    }
}

export { EditComponent }