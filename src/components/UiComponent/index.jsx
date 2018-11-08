import React, { Component } from 'react';
import LayerManagerContainer from '../../containers/LayerManagerContainer'
import './style.css'
class UiComponent extends Component {
    render() {
        return (
            <div className="ui-component-context">
                <div className="layer-manager-context">
                    <LayerManagerContainer></LayerManagerContainer>
                </div>
            </div>
        );
    }
}


export default UiComponent