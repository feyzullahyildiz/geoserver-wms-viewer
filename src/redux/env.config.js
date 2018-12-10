export const initialData = () => ({
  // "lat": 41.02,
  // "lng": 28.86,
  // "zoom": 8,
  // "basemapOpacity": 0.5,
  layers: [
    {
      "title": "Datas",
      "url": "http://194.182.80.44:8080/geoserver/test/wms",
      "opacity": 0.6,
      "type": "geoserver",
      "visible": true,
      "layers": [
        {
          "layerName": "test:bridges",
          "visible": true
        },
        {
          "layerName": "test:random_points",
          "visible": true
        }
      ]
    }
  ],
  basemaps: [
    { url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', visible: true, title: 'Wikimedia Maps', opacity: 1 },
    { url: 'http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png', visible: false, title: 'OpenCycle', opacity: 1 },
    { url: 'http://{a-b}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', visible: false, title: 'Humanitarian map style', opacity: 1 },
    { url: 'http://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', visible: false, title: 'OSM France', opacity: 1 },
    { url: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', visible: false, title: 'Stamen Toner', opacity: 1 },
    { url: 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', visible: false, title: 'Stamen Watercolor', opacity: 1 },
    { url: 'https://cartodb-basemaps-{1-3}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', visible: false, title: 'CartoDB Light ', opacity: 1 },
    { url: 'https://cartodb-basemaps-{1-3}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', visible: false, title: 'CartoDB Dark', opacity: 1 },
  ]
})
