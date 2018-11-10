import React, { Component } from 'react';
import CheckboxComponent from '../CheckboxComponent'
class LayerManagerComponent extends Component {
    render() {
        const { title, visible, opacity, onVisibleChanged, onOpacityChanged, children } = this.props

        return (
            <div className="layer">

                <CheckboxComponent
                    onChange={onVisibleChanged}
                    checked={visible}
                >
                    {title}
                </CheckboxComponent>
                <input type="range" value={opacity} onChange={(e) =>onOpacityChanged(e.target.value)} step={0.05} max={1} min={0.05}/> 
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

export default LayerManagerComponent;