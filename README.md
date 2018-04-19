Bu proje geoserverda wms olarak yayınlanan katmanları aynı anda kullanıp-yönetebilmek amacı ile yapılmıştır.

projeyi çalıştırmak için
- npm install (yarn install)
- npm start (yarn start)

katman eklemek için config.json dosyasında ilgili ayarları yapabilirsiniz.

* Örnek config.json dosyası
{
    "lat": 41.02,
    "lng": 28.86,
    "zoom": 8,
    "layers": [
        {
            "url": "http://192.168.20.83:8080/geoserver/panaromikbulut/wms",
            "layers": [
                {
                    "layerName": "panaromikbulut:kapi",
                    "visible": false,
                    "opacity": 0.85
                }
            ]
        },
        {
            "url": "http://192.168.20.114:8091/geoserver/YTB/wms",
            "layers": [
                {
                    "layerName": "YTB:bg_universiteler",
                    "visible": true,
                    "opacity": 0.85
                },
                {
                    "layerName": "YTB:an_bg_il_camisayi",
                    "visible": true,
                    "opacity": 0.85
                }
            ]
        }
    ]
}
Uygulamayı açtığınızda haritanın konumunu belirlemek için config.json dosyasından zoom, lat, lng değerlerini değiştirebilirsiniz.
