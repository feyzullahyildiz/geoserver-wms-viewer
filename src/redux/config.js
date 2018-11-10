export const initialData = {
  // "lat": 41.02,
  // "lng": 28.86,
  // "zoom": 8,
  // "basemapOpacity": 0.5,
  "layers": [
    {
      "title": "Beyoğlu",
      "url": "http://159.69.2.10:8080/geoserver/beyoglukent/wms",
      "opacity": 0.9,
      "type": "geoserver",
      "visible": true,
      "layers": [
        {
          "layerName": "beyoglukent:m_deniz",
          "visible": true
        },
        {
          "layerName": "beyoglukent:ilce",
          "visible": false
        },
      ]
    }
  ]
}
