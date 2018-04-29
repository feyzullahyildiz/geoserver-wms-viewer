Bu proje geoserverda wms olarak yayınlanan katmanları aynı anda kullanıp-yönetebilmek amacı ile yapılmıştır.

Projenin release(hazır) halini kullanmak için IIS, Apache gibi serverlarda yayımlamanız gerekiyor.
Tavisyem nodejs üzerinde çalışan http-server kullanmanız. Bunun için bilgisayarınızda nodejs kurulu olması gerekmektedir.
- cmd ekranında 'npm install http-server -g' yazınız. Detaylı bilgi : https://www.npmjs.com/package/http-server
- cmd ekranrında yayımlamak istediğiniz klasör için, 'http-server "istediğiniz_klasör"' yazdıktan sonra altta çıkan link-portlardan projeye ulaşabilirsiniz. Örnek kod: 'http-server C:\Users\Feyzullah\Desktop\Projem27'

projeyi çalıştırmak için
- npm install (yarn install)
- npm start (yarn start)

katman eklemek için config.json dosyasında ilgili ayarları yapabilirsiniz.

* Örnek config.json dosyası
```json
{
  "lat": 41.02,
  "lng": 28.86,
  "zoom": 8,
  "basemapOpacity": 0.9,
  "layers": [
    {
      "url": "http://localhost:8081/topp/wms",
      "opacity": 0.5,
      "type": "geoserver",
      "visible": true,
      "layers": [
        {
          "layerName": "topp:states",
          "visible": true
        },
        {
          "layerName": "topp:tasmania_roads",
          "visible": true
        }
      ]
    },
    {
      "url": "http://localhost:8081/qgis/wms",
      "opacity": 0.8,
      "type": "geoserver",
      "visible": true,
      "layers": [
        {
          "layerName": "qgis:gungoren_panogps.shp",
          "visible": false
        },
        {
          "layerName": "qgis:gungoren.shp",
          "visible": true
        }
      ]
    }
  ]
}
```

Uygulamayı açtığınızda haritanın konumunu belirlemek için config.json dosyasından zoom, lat, lng değerlerini değiştirebilirsiniz.
