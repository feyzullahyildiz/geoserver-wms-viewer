import React, { Component } from 'react';
import { connect } from 'react-redux'
import UiComponent from './components/UiComponent'
import { MapContainer } from './contexts/MapContext'
import { WmsLayer } from './contexts/WmsLayer';
import { BaseMapLayer } from './contexts/BaseMapLayer';
import { MapSettingsManager } from './contexts/MapSettingsManager';
class App extends Component {

  render() {
    const { layers, basemaps, config, mapSettings } = this.props
    let wmsLayers = layers.map((layer, index) => {
      return <WmsLayer
        key={index}
        url={layer.url}
        layers={layer.layers}
        visible={layer.visible}
        opacity={layer.opacity}
      />
    })
    const basemapLayers = basemaps.map((layer, index) => {
      return <BaseMapLayer
        key={index}
        url={layer.url}
        visible={layer.visible}
        opacity={layer.opacity}
        title={layer.title}
      />
    })
    return (
      <React.Fragment>
        <MapContainer center={mapSettings.center} zoom={mapSettings.zoom}>
          {wmsLayers}
          {basemapLayers}
          <MapSettingsManager/>
        </MapContainer>
        <UiComponent isEdit={config.isEdit} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  layers: state.layers,
  config: state.config,
  basemaps: state.basemaps,
  mapSettings: state.mapSettings,
})
export default connect(mapStateToProps)(App);
