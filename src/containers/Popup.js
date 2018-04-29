import React, { Component } from 'react';
import store from '../redux/store'
import Overlay from 'ol/overlay'
import '../styles/popup.css'
// import {connect} from 'react-redux'
import { setPopup } from '../redux/actions/action-config'

class Popup extends Component {
    constructor() {
        super()
        this.state = { features: undefined }

        this.onPopupClose2 = this.onPopupClose2.bind(this)

        store.subscribe(() => {
            // console.log('store.getState().features', store.getState().features)
            this.setState({ features: store.getState().features })
        })
    }
    componentDidMount() {
        this._overlay = new Overlay({
            element: document.getElementById('popup')
        })
        store.dispatch(setPopup(this._overlay))
    }
    onPopupClose2() {
        this._overlay.setPosition(undefined)
    }
    featureRenderer(feature, i, j) {
        let keys = Object.keys(feature.properties)
        let table = keys.map((key, ii) => {
            return <tr key={'tr' + i + '-' + j + '-' + ii}>
                <th key={'th' + i + '-' + j + '-' + ii}> {key}</th>
                <td key={'td' + i + '-' + j + '-' + ii}> {feature.properties[key]}</td>
            </tr>
        })
        table = <table key={'table' + i + '-' + j}><tbody>{table}</tbody></table>
        return (
            <div key={'body' + i + '-' + j} style={{ overflowY: 'scroll', height: '180px', marginRight: '15px' }}>
                {table}
            </div>
        )
    }
    render() {

        let features = this.state.features
        let display
        // console.log('upper features', features)
        if (features !== undefined && features.position !== undefined) {
            // console.log('here', features)
            let layers = features.features.map(layer => {
                if (layer.features.length > 0) {
                    return layer
                }
            }).filter(x => x)
            if (layers.length > 0) {
                display = layers.map((item, i) => {
                    return item.features.map((feature, j) => {
                        return this.featureRenderer(feature, i, j)
                    })
                })
                this._overlay.setPosition(features.position.coordinate)
            }


        }
        return (
            <div>
                <div id="popup" className="ol-popup" style={{ zIndex: 1000 }}>
                    {/* <a href="#" onClick={(e)=>{this.onPopupClose(e)}}>ss</a> */}
                    <div id="popup-content">{display}</div>
                </div>
            </div>
        );
    }
}

export default Popup;