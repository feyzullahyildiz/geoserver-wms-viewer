import React, { Component } from 'react';
// import logo from './logo.svg';
import Map from 'ol/map'
import View from 'ol/view'
import BingMaps from "ol/source/bingmaps"
import Tile from "ol/layer/tile"
import OSM from 'ol/source/osm'
import Proj from 'ol/proj'
import Image from 'ol/layer/image'
import ImageWms from 'ol/source/imagewms'
import ControlScaleLine from 'ol/control/scaleline'
import Control from 'ol/control'

class App extends Component {
  constructor() {
    super()
    this._layers = []
    this.state = {}
  }
  componentDidMount() {
    var scaleLineControl = new ControlScaleLine({
      className: 'm-right'
    })
    const map = new Map({
      controls: Control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([
        scaleLineControl
      ]),
      target: 'map',
      view: new View()
    })
    this._map = map
    map.updateSize()
    map.addLayer(new Tile({ source: new OSM() }))
    this.loadWmsLayers()
    scaleLineControl.setUnits('metric')
    console.log('map', map)
  }
  changeVisibility(e, item) {
    item.wms.setVisible(!item.wms.getVisible())
    if (item.wms.getVisible() === true) {
      e.target.className = 'active'
    } else {
      e.target.className = ''
    }
  }
  loadWmsLayers() {
    fetch('/config.json')
      .then(data => data.json())
      .then(config => {
        this._map.getView().animate({ zoom: config.zoom, center: Proj.fromLonLat([config.lng, config.lat]) })
        config.layers.map(geoserver => {
          // console.log('geoserver', geoserver)
          geoserver.layers.map(layer => {
            let wms = new Image({
              source: new ImageWms({
                url: geoserver.url,
                params: { 'LAYERS': layer.layerName },
                serverType: 'geoserver'
              }),
              opacity: layer.opacity
            })
            this._map.addLayer(wms)
            this._layers.push({ wms: wms, layer: layer })
          })
        })
        let _layers = this._layers.map((item, index) => {
          return <div key={index}><a className={item.layer.visible === true ? 'active' : ''} key={index} href="#" onClick={(e) => this.changeVisibility(e, item)} > {item.layer.layerName.split(':')[1]} </a></div>
        })
        this.setState({ layers: _layers })
      })

  }
  render() {

    return (
      <div id="map" className="map">
        <div className="layers">
          <div className="layers-header">Katmanlar</div>
          <div className="layers-body"> {this.state.layers} </div>
        </div>
      </div>
    );
  }
}

export default App;
