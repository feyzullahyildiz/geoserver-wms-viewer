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
import Slider from 'react-rangeslider'
import Layers from './components/Layers'
import 'react-rangeslider/lib/index.css'
import Basemaps from './components/Basemaps';
class App extends Component {
  constructor() {
    super()
    this._layers = []
    this.state = {}
    this.onBasemapVisibleChange = this.onBasemapVisibleChange.bind(this)
    this.onBasemapOpacityChange = this.onBasemapOpacityChange.bind(this)
    this.changeVisibility = this.changeVisibility.bind(this)
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

    this.loadWmsLayers()
    scaleLineControl.setUnits('metric')
  }

  onBasemapOpacityChange(e, item) {
    this._basemap.setOpacity(e)
    this.setState({
      basemapOpacity: e
    })
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

        e.target.className = ''
      }
      layers = layers.join(',')

      item.wms.getSource().updateParams({ 'LAYERS': layers })
    }
  }
  onBasemapVisibleChange(e, e2) {

    this._basemap.setVisible(e.target.checked)
  }
  loadWmsLayers() {
    fetch('/config.json')
      .then(data => data.json())
      .then(config => {
        this._basemap = new Tile({ source: new OSM })
        this._basemap.setOpacity(config.basemapOpacity)
        this.setState({ basemapOpacity: config.basemapOpacity })

        this._map.addLayer(this._basemap)

        let basemaps = <label>OSM<input type="checkbox" defaultChecked={true} onChange={this.onBasemapVisibleChange} /></label>
        this.setState({ basemaps: basemaps })

        this._map.getView().animate({ zoom: config.zoom, center: Proj.fromLonLat([config.lng, config.lat]) })
        config.layers.map(geoserver => {
          console.log('geoserver', geoserver)
          let wms = new Image({
            source: new ImageWms({
              url: geoserver.url,
              params: { LAYERS: '' },
              serverType: geoserver.type
            }),
            opacity: geoserver.opacity,
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

          layersString = layersString.filter(val => val).join(',')


          wms.getSource().updateParams({ 'LAYERS': layersString })

          return undefined
        })

        this.setState({ layers: this._layers })
      })

  }
  render() {

    return (
      <div id="map" className="map">
        <Layers data={this.state.layers} onLayerVisibilityChange={this.changeVisibility} />
        <Basemaps data={this.state.basemaps} onBasemapOpacityChange={this.onBasemapOpacityChange} baseMapOpcity={this.state.basemapOpacity}/>

      </div>
    );
  }
}

export default App;
