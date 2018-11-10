import React, { Component } from 'react';
import { connect } from 'react-redux'
// import logo from './logo.svg';
// import Map from 'ol/map'
// import View from 'ol/view'
// import Tile from "ol/layer/tile"
// import OSM from 'ol/source/osm'
// import Proj from 'ol/proj'
// import Image from 'ol/layer/image'
// import ImageWms from 'ol/source/imagewms'
// import ControlScaleLine from 'ol/control/scaleline'
// import Control from 'ol/control'
// import 'react-rangeslider/lib/index.css'
// import Basemaps from './components/Basemaps';
// import { addLayer } from './redux/actions/action-layers'
// import { setFeatures } from './redux/actions/action-features'
// import { setMap } from './redux/actions/action-config'
// import store from './redux/store'
// import LayersContainer from './containers/LayersContainer'
// import Popup from './containers/Popup'
// import SearchContainer from './containers/SearchContainer'

// import VectorSource from 'ol/source/vector'
// import VectorLayer from 'ol/layer/vector'

import UiComponent from './components/UiComponent'
import { MapContainer } from './contexts/MapContext'
import { WmsLayer } from './contexts/WmsLayer';
class App extends Component {

  render() {
    const { layers } = this.props
    let wmsLayers = layers.map((layer, index) => {
      return <WmsLayer
        key={index}
        url={layer.url}
        layers={layer.layers}
        visible={layer.visible}
        opacity={layer.opacity}
      />
    })
    return (
      <React.Fragment>
        <MapContainer>
          {wmsLayers}
        </MapContainer>
        <UiComponent></UiComponent>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  layers: state.layers
})
export default connect(mapStateToProps)(App);
