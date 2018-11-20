import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeLayerProperty, changeNestedLayerProperty, deleteLayer } from '../redux/actions/action-layers'
import { LayerManagerComponent} from '../components/LayerManagerComponent'
import { layerEditModalOpenSubject } from '../rxjs/subjects';
class _LayerManagerContainer extends Component {

    onLayerChange(layer, property) {
        this.props.chanelayerpropery(layer, property)
    }
    onANestedLayerChange(layer, nestedLayer, property) {
        this.props.chaneanestedlayerpropery(layer, nestedLayer, property)
    }
    onEditLayer(layer){
        layerEditModalOpenSubject.next(layer)
    }
    onDeleteLayer(layer){
        const { deletelayer } = this.props
        deletelayer(layer)
    }
    render() {
        const { layers, config} = this.props
        return (
            <React.Fragment>
                {
                    layers.map((layer, index) => {

                        return <LayerManagerComponent
                            key={layer.url + index}
                            onVisibleChanged={() => this.onLayerChange(layer, { visible: !layer.visible })}
                            onOpacityChanged={(val) => this.onLayerChange(layer, { opacity: val })}
                            opacity={layer.opacity}
                            visible={layer.visible}
                            url={layer.url}
                            title={layer.title}
                            isEdit={config.isEdit}
                            onEditLayer={() => this.onEditLayer(layer)}
                            onDeleteLayer={() => this.onDeleteLayer(layer)}
                        >
                            {layer.layers.map((nestedLayer, j) => {
                                return {
                                    key: nestedLayer.layerName + j,
                                    visible: nestedLayer.visible,
                                    layerName: nestedLayer.layerName,
                                    onToggled: () => this.onANestedLayerChange(layer, nestedLayer, { visible: !nestedLayer.visible })
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
    layers: state.layers,
    config: state.config,
})
const mapDispatchToProps = (dispatch) => ({
    chanelayerpropery: (layer, property) => dispatch(changeLayerProperty(layer, property)),
    chaneanestedlayerpropery: (layer, nestedLayer, property) => dispatch(changeNestedLayerProperty(layer, nestedLayer, property)),
    deletelayer: (layer) => dispatch(deleteLayer(layer))
})
const LayerManagerContainer = connect(mapStateToProps, mapDispatchToProps)(_LayerManagerContainer);
export { LayerManagerContainer }