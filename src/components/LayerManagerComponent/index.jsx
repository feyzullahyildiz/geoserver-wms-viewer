import React, { Component } from 'react';
import CheckboxComponent from '../CheckboxComponent'
class LayerManagerComponent extends Component {
    render() {
        const { url, visible, opacity, onToggled, children } = this.props
        console.log('childs', children)

        return (
            <div className="layer-manager-context">
                {url}
                <div className="layers">
                    {
                        children.map((ll, index) => {
                            return <CheckboxComponent
                                onChange={ll.onToggled}
                                checked={ll.visible}
                                key={ll.key + index}>
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