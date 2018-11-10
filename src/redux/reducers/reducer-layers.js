export default (state = [], action) => {

    if (action.type === 'CHANGE_LAYER_PROPERTY') {
        const { layer, property } = action.payload
        let i = state.indexOf(layer)
        // TESTME for  Object.assign(layer, property)
        let newLayer = Object.assign({}, layer, property)
        state[i] = newLayer
        return Object.assign([], state)
    }
    else if (action.type === 'CHANGE_NESTED_LAYER_PROPERTY') {

        const { layer, nestedLayer, property } = action.payload
        const layerIndex = state.indexOf(layer)
        const nestedLayerIndex = layer.layers.indexOf(nestedLayer)
        let newNestedLayer = Object.assign({}, nestedLayer, property)

        layer.layers[nestedLayerIndex] = newNestedLayer
        layer.layers = Object.assign([], layer.layers)
        let newLayer = Object.assign({}, layer)
        state[layerIndex] = newLayer
        return Object.assign([], state)
    }
    else if(action.type === 'ADD_NEW_LAYER'){
        state.push(action.payload)
        return Object.assign([], state)
    }
    return state
}