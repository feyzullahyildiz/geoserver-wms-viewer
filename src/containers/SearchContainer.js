import React, { Component } from 'react';
import { connect } from 'react-redux'
import AutoComplete from 'material-ui/AutoComplete';
// import MultiPolygon from 'ol/layer/'
import WKT from 'ol/format/wkt'
import GeoJSON from 'ol/format/geojson';
class SearchContainer extends Component {

    constructor() {
        super()
        this.state = { searchResult: [] }
    }
    onNewRequest(obj) {
        // console.log('WKT' ,WKT)
        // debugger
        // console.log(new WKT().readGeometry(obj.geom.geometry))
        this._map.getView().fit(obj.feature.getGeometry())
        let { infoLayer } = this.props
        infoLayer.getSource().clear()
        infoLayer.getSource().addFeature(obj.feature)

    }
    onSearchHandle(val) {
        // console.log('onSearchHandle', val)
        let searchKey = "'%" + val + "%'"
        if (val.length < 2) return
        searchKey = encodeURI(searchKey)
        let urls = []
        let { layers } = this.props
        if (layers) {
            for (let layer of layers) {
                let innerLayers = layer.info.layers
                // console.log('mainlayer', layer)
                if (!layer.info.visible) continue
                for (let ll of innerLayers) {
                    if (!ll.visible) { continue }
                    let url = layer.info.url + '?service=WFS&version=1.0.0&request=GetFeature&typeName=' + ll.layerName + '&CQL_FILTER=' + ll.searchKey + ' like ' + searchKey +
                        '&outputformat=application/json&maxFeatures=3&propertyName=geom,' + ll.searchKey
                    urls.push(url)
                }
            }
        }
        let requestsArray = urls.map((url) => {
            let request = new Request(url, {
                method: 'GET'
            });

            return fetch(request).then(res => res.json());
        });
        let features = []
        Promise.all(requestsArray).then(allResults => {
            // console.log(allResults)
            let found = false
            for (let res of allResults) {
                if (res.totalFeatures !== 0) {
                    found = true
                    let geojson = (new GeoJSON()).readFeatures(res, { featureProjection: this._map.getView().getProjection() })
                    let nameField = Object.keys(res.features[0].properties)[0]
                    for (let feature of geojson) {
                        features.push({ name: feature.get(nameField) + ' - ' + nameField, feature: feature })
                    }
                }
            }
            if (!found) {
                console.log('bulamadık')
            } else {
                this.setState({ searchResult: features })
            }
        })
    }
    render() {
        let { map } = this.props
        if (!this._map) {
            this._map = map
        }

        const menuProps = {
            desktop: true,
            disableAutoFocus: true,
        };
        return (
            <div className="search">
                <AutoComplete
                    hintText="Arama yap, Sadece açık katmanlarda arama yapılır"
                    dataSource={this.state.searchResult}
                    menuProps={menuProps}
                    dataSourceConfig={{ text: 'name', value: 'feature' }}
                    onUpdateInput={this.onSearchHandle.bind(this)}
                    onNewRequest={this.onNewRequest.bind(this)}

                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    layers: state.layers
})
export default connect(mapStateToProps)(SearchContainer);