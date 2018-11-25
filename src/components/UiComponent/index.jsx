import React from 'react';
import { LayerManagerContainer } from '../../containers/LayerManagerContainer'
import './style.css'
import { EditContainer } from '../../containers/EditContainer';
import { BasemapContainer } from '../../containers/BasemapContainer';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { MapSettingsContainer } from '../../containers/MapSettingsContainer';
import { LayerModifyContainer } from '../../containers/LayerModifyContainer';

export const UiComponent = (props) => {
    return (
        <div className={`ui-component-context ${props.isEdit ? 'edit' : ''}`}>
            <div className="top-right-area">
                <Card>
                    <CardContent>
                        <div className="edit-manager">
                            <EditContainer />
                        </div>
                        <div className="layer-manager">
                            <LayerManagerContainer />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="bottom-right-area">
                <MapSettingsContainer />
                <BasemapContainer />
            </div>
            <div className="modals">
                <LayerModifyContainer />
            </div>
        </div>
    );
}
