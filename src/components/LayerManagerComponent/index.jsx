import React, { Component } from 'react';
import CheckboxComponent from '../CheckboxComponent'
import PropTypes from 'prop-types'
class LayerManagerComponent extends Component {
    render() {
        const { title, visible, opacity, onVisibleChanged, onOpacityChanged, children, isEdit, onLayerEditClicked } = this.props

        return (
            <div className={`layer ${isEdit ? 'edit' : ''}`}>
                <div className="layer-main-container">
                    <div className="left">
                        <button onClick={onLayerEditClicked}>Edit</button>
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
                            return <div key={index} className="nested-main-container">
                                <div className="left">
                                    <button>Edit</button>
                                </div>
                                <div className="right">
                                    <CheckboxComponent
                                        onChange={ll.onToggled}
                                        checked={ll.visible}
                                        key={ll.key + index}
                                        size="small"
                                    >
                                        {ll.layerName}
                                    </CheckboxComponent>
                                </div>
                            </div>
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
    isEdit: PropTypes.bool
}
export default LayerManagerComponent;