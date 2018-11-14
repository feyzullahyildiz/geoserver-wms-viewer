import React from 'react';
import LayerManagerContainer from '../../containers/LayerManagerContainer'
import './style.css'
import EditContainer from '../../containers/EditContainer';
import BasemapContainer from '../../containers/BasemapContainer';

export default (props) => {
    return (
        <div className={`ui-component-context ${props.isEdit ? 'edit' : ''}`}>

            <div className="top-right-area">
                <div className="edit-manager">
                    <EditContainer />
                </div>
                <div className="layer-manager">
                    <LayerManagerContainer />
                </div>
            </div>
            <div className="bottom-right-area">
                <BasemapContainer />
            </div>
        </div>
    );
}
