import React from 'react';
import LayerManagerContainer from '../../containers/LayerManagerContainer'
import './style.css'
import EditContainer from '../../containers/EditContainer';
import BasemapContainer from '../../containers/BasemapContainer';

import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export default (props) => {
    return (
        <div className={`ui-component-context ${props.isEdit ? 'edit' : ''}`}>

            {/* <div className="top-right-area">
                <div className="edit-manager">
                    <EditContainer />
                </div>
                <div className="layer-manager">
                    <LayerManagerContainer />
                </div>
            </div> */}
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
                <BasemapContainer />
            </div>
        </div>
    );
}
