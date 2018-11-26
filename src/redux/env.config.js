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
    { url: 'http://mt{1-3}.google.com/vt/lyrs=m@113&hl=tr&&x={x}&y={y}&z={z}', visible: true, title: 'Google Road', opacity: .5 },
    { url: 'http://mt{1-3}.google.com/vt/lyrs=y@113&hl=tr&&x={x}&y={y}&z={z}', visible: false, title: 'Google Hybrid', opacity: .8 },
    { url: 'http://mt{1-3}.google.com/vt/lyrs=s@13&hl=tr&&x={x}&y={y}&z={z}', visible: false, title: 'Google Satellite', opacity: .8 },
    { url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png', visible: false, title: 'Open Street', opacity: .8 },
    { url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png', visible: false, title: 'Open Topographic', opacity: 1 }
  ]
})
