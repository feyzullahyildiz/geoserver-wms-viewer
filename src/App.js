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
import 'react-rangeslider/lib/index.css'
import Basemaps from './components/Basemaps';
import { connect } from 'react-redux'
import { addLayer } from './redux/actions/action-layers'
import { setFeatures } from './redux/actions/action-features'
import { setMap } from './redux/actions/action-config'
import store from './redux/store'
import LayersContainer from './containers/LayersContainer'
import Popup from './containers/Popup'

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
    window.map = map
    store.dispatch(setMap(map))
    map.on('singleclick', this.onMapSingleClick.bind(this))
    this._map = map
    map.updateSize()

    this.loadWmsLayers()
    scaleLineControl.setUnits('metric')

    store.subscribe(() => {
      this.setState({ layers: store.getState().layers })
    })
  }
  onBasemapOpacityChange(e, item) {
    this._basemap.setOpacity(e)
    this.setState({
      basemapOpacity: e
    })
  }
  changeVisibility(e, item) {
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
        this._basemap = new Tile({ source: new OSM() })
        this._basemap.setOpacity(config.basemapOpacity)
        this.setState({ basemapOpacity: config.basemapOpacity })

        this._map.addLayer(this._basemap)

        let basemaps = <label>OSM<input type="checkbox" defaultChecked={true} onChange={this.onBasemapVisibleChange} /></label>
        this.setState({ basemaps: basemaps })

        this._map.getView().animate({ zoom: config.zoom, center: Proj.fromLonLat([config.lng, config.lat]) })
        config.layers.map(geoserver => {
          let wms = new Image({
            source: new ImageWms({
              url: geoserver.url,
              params: { LAYERS: '' },
              serverType: geoserver.type
            }),
            opacity: geoserver.opacity,
            visible: geoserver.visible
          })
          let urlArray = geoserver.url.split('/')
          this.props.dispatch(addLayer(wms, geoserver, urlArray[urlArray.length - 2].toUpperCase()))
          this._map.addLayer(wms)

          let layersString = geoserver.layers.map(layer => {
            this._layers.push({ wms: wms, layer: layer })
            if (layer.visible) {
              return layer.layerName
            }
            return
          })

          layersString = layersString.filter(val => val).join(',')

          wms.getSource().updateParams({ 'LAYERS': layersString })
          return geoserver
        })
      })

  }
  onMapSingleClick(event) {
    // console.log('event', event)
    // console.log('store.getState()', store.getState())
    store.getState().config.popup.setPosition(undefined)
    let activeLayers = store.getState().layers.filter((item) => item.info.visible).map(x => x.wms)
    let urls = activeLayers.map(item => {
      return item.getSource().getGetFeatureInfoUrl(event.coordinate,
        this._map.getView().getResolution(),
        this._map.getView().getProjection(), {
          INFO_FORMAT: "application/json"
        })
    })
    let promises = urls.map(url => fetch(url).then(y => y.text()));
    Promise.all(promises).then(results => {
      let res = results.map(item => JSON.parse(item))
      store.dispatch(setFeatures(res, event))
    });
  }
  render() {

    return (
      <div id="map" className="map">
        <Popup />
        <LayersContainer data={this.state.layers} />
        <Basemaps data={this.state.basemaps} onBasemapOpacityChange={this.onBasemapOpacityChange} baseMapOpcity={this.state.basemapOpacity} />

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  layers: state.layers
})
export default connect(mapStateToProps)(App);
