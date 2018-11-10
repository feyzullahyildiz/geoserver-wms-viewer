export const initialData = {
  // "lat": 41.02,
  // "lng": 28.86,
  // "zoom": 8,
  // "basemapOpacity": 0.5,
  "layers": [
    {
      "title": "Datas",
      "url": "http://localhost:8080/geoserver/datas/wms",
      "opacity": 0.6,
      "type": "geoserver",
      "visible": true,
      "layers": [
        {
          "layerName": "datas:districts",
          "visible": false
        }
      ]
    }
  ]
}
