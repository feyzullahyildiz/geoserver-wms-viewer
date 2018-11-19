import React, { Component } from 'react';
import olMap from 'ol/Map'
import olView from 'ol/View'
const MapContext = React.createContext({
    map: null
})
class MapContainer extends Component {
    _mapReference = React.createRef()
    componentWillMount() {
        const { zoom, center } = this.props
        this._map = new olMap({
            view: new olView({
                zoom: zoom || 8,
                center: center || [3200000, 5000000]
            }),
            controls: [],
            layers: []
        })
    }
    componentDidMount() {
        this._map.setTarget(this._mapReference.current)
    }
    render() {
        const { children } = this.props
        return (
            <div style={{ width: '100%', height: '100%', }} ref={this._mapReference}>
                <MapContext.Provider value={{ map: this._map }}>
                    {children}
                </MapContext.Provider>
            </div>
        );
    }
}

export { MapContainer, MapContext };