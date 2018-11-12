import React, { Component } from 'react';
import CheckboxComponent from '../CheckboxComponent'
import PropTypes from 'prop-types'
class LayerManagerComponent extends Component {
    render() {
        const { title, visible, opacity, onVisibleChanged, onOpacityChanged, children, isEdit, onEditLayer, onDeleteLayer } = this.props

        return (
            <div className={`layer ${isEdit ? 'edit' : ''}`}>
                <div className="layer-main-container">
                    <div className="left">
                        <button onClick={onEditLayer}>Edit</button>
                        <button onClick={onDeleteLayer}>Delete</button>
                    </div>
                    <div className="right">
                        <CheckboxComponent
                            onChange={onVisibleChanged}
                            checked={visible}
                        >
                            {title}
                        </CheckboxComponent>
                        <input type="range" value={opacity} onChange={(e) => onOpacityChanged(e.target.value)} step={0.05} max={1} min={0.05} />
                    </div>
                </div>

                <div className="nested-layers">
                    {
                        children.map((ll, index) => {
                            return <CheckboxComponent
                                onChange={ll.onToggled}
                                checked={ll.visible}
                                key={ll.key + index}
                                size="small"
                            >
                                {ll.layerName}
                            </CheckboxComponent>
                        })
                    }
                </div>
            </div>
        );
    }
}
// LayerManagerComponent.defaultProps = {
//     isEdit: ''
// }
LayerManagerComponent.propTypes = {
    isEdit: PropTypes.bool,
    onEditLayer: PropTypes.func,
    onDeleteLayer: PropTypes.func
}
export default LayerManagerComponent;