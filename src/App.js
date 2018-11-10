import React, { Component } from 'react';
import { connect } from 'react-redux'

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
