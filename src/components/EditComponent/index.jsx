import React, { Component } from 'react'

class EditComponent extends Component {
    render() {
        const { isEditMode, onEditModeChange, onLayerAddClicked, onReset } = this.props
        return (
            <div>
                <button onClick={onEditModeChange}> {isEditMode ? 'Close' : 'Edit'} </button>
                {isEditMode ?
                    (<React.Fragment>
                        <button onClick={onLayerAddClicked}> Add </button>
                        <button onClick={onReset}> Reset </button>
                    </React.Fragment>)
                    : null
                }

            </div>
        )
    }
}

export { EditComponent }