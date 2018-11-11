export const changeNestedLayerProperty = (layer, nestedLayer, property) => {
    return {
        type: 'CHANGE_NESTED_LAYER_PROPERTY',
        payload: {
            layer, nestedLayer, property
        }
    }
}
export const changeLayerProperty = (layer, property) => {
    return {
        type: 'CHANGE_LAYER_PROPERTY',
        payload: {
            layer, property
        }
    }
}
export const addNewLayer = ({ title, url, layers, visible = true, opacity = 1 }) => {
    return {
        type: 'ADD_NEW_LAYER',
        payload: {
            title,
            url,
            layers,
            visible,
            opacity
        }
    }
}
export const deleteLayer = (layer) => {
    return {
        type: 'DELETE_LAYER',
        payload: layer
    }
}
export const resetLayers = () => {
    return {
        type: 'RESET_LAYERS'
    }
}