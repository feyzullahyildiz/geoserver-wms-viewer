import React, { Component } from 'react';
import { connect } from 'react-redux'

import LayerManagerComponent from '../components/LayerManagerComponent'
class LayerManagerContainer extends Component {

    render() {
        const { layers } = this.props
        return (
            <React.Fragment>
                {
                    layers.map((layer, index) => {

                        return <LayerManagerComponent
                            key={layer.url + index}
                            onToggled={() => { console.log('LAYER toggled', layer) }}
                            opacity={layer.opacity}
                            visible={layer.visible}
                            url={layer.url}
                        >
                            {layer.layers.map((miniLayer, j) => {
                                return {
                                    key: miniLayer.layerName + j,
                                    visible: miniLayer.visible,
                                    layerName: miniLayer.layerName,
                                    onToggled: () => { console.log('minilayer toggled', miniLayer, layer) }
                                }
                            })}
                        </LayerManagerComponent>
                    })
                }
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    layers: state.layers
})
export default connect(mapStateToProps)(LayerManagerContainer);