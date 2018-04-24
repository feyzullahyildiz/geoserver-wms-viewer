import React, { Component } from 'react';
// import logo from './logo.svg';
import Map from 'ol/map'
import View from 'ol/view'
// import BingMaps from "ol/source/bingmaps"
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
    // console.log('map', map)
  }
  changeVisibility(e, item) {
    // console.log('item', item)
    if (item.wms.getVisible() === false) {
      e.target.className = 'active'
      item.wms.setVisible(true)
      item.wms.getSource().updateParams({ 'LAYERS': item.layer.layerName })
      return
    }
    let layers = item.wms.getSource().params_.LAYERS.split(',')
    // console.log('len ', layers.length)
    let wasVisible = layers.find(x => x === item.layer.layerName) === undefined ? false : true //önceden varmıydı
    if (layers.length === 1 && wasVisible) {
      item.wms.setVisible(false)
      e.target.className = ''
      return
    } else {
      if (wasVisible === false) {
        e.target.className = 'active'
        layers.push(item.layer.layerName)
      } else {
        layers = layers.filter(x => x !== item.layer.layerName)
        // console.log('layers', layers)
        e.target.className = ''
      }
      layers = layers.join(',')
      // console.log('layers', layers)
      item.wms.getSource().updateParams({ 'LAYERS': layers })
    }
  }
  loadWmsLayers() {
    fetch('/config.json')
      .then(data => data.json())
      .then(config => {
        this._map.getView().animate({ zoom: config.zoom, center: Proj.fromLonLat([config.lng, config.lat]) })
        config.layers.map(geoserver => {
          console.log('geoserver', geoserver)
          let wms = new Image({
            source: new ImageWms({
              url: geoserver.url,
              params: { LAYERS: '' },
              serverType: 'geoserver'
            }),
            opacity: 0.9,
            visible: true
          })
          this._map.addLayer(wms)
          let layersString = geoserver.layers.map(layer => {
            this._layers.push({ wms: wms, layer: layer })
            if (layer.visible) {
              return layer.layerName
            }
            return undefined
          })
          // console.log('layersString', layersString)
          layersString = layersString.filter(val => val).join(',')
          // console.log('layersString', layersString)

          wms.getSource().updateParams({ 'LAYERS': layersString })
          // console.log('layer string', layersString)
          return undefined
        })
        let _layers = this._layers.map((item, index) => {
          // console.log('item', item)
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
