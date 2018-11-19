import React, { Component } from 'react'
import { MapContext } from './MapContext';
import { mapPosition } from '../rxjs/subjects' 
import { connect } from 'react-redux'

import { setMapPosition } from '../redux/actions/action-mapsettings'

class _MapSettingsManager extends Component {
    componentDidMount(){
        this._mapPositionSubscription = mapPosition.subscribe(() => {
            const view = this._map.getView()
            const zoom = view.getZoom()
            const center = view.getCenter()
            this.props.setmapposition({zoom, center})
        })
    }
    componentWillUnmount(){
        if(this._mapPositionSubscription){
            this._mapPositionSubscription.unsubscribe()
        }
    }
    render() {
        return (
            <MapContext.Consumer>
                {
                    (mapcontext) => {
                        this._map = mapcontext.map
                        return null
                    }
                }
            </MapContext.Consumer>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    setmapposition: (data) => dispatch(setMapPosition(data))
})

const MapSettingsManager = connect(undefined, mapDispatchToProps)(_MapSettingsManager)
export { MapSettingsManager }