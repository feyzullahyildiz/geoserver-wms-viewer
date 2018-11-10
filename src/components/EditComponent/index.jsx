import React, { Component } from 'react'

class EditComponent extends Component {
    render() {
        const {isEditMode, onEditModeChange} = this.props
        return (
            <div>
                <button onClick={onEditModeChange}> {isEditMode ? 'Close' : 'Edit'} </button>
            </div>
        )
    }
}

export { EditComponent }