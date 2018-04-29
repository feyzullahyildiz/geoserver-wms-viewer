export default function (state = [], action) {
    if (action.type === 'ADD_LAYER') {
        state = [...state, action.payload]
    }
    else if (action.type === 'CHANGE_VISIBILITY') {
        state = state.map(x => {
            if (x.info.layers.filter(x => x.visible).length === 1 && action.payload.name.visible) {
                x.info.visible = false
                x.wms.setVisible(false)
                return x
            }
            if (x.id === action.payload.id) {
                let layers = x.info.layers.map(ll => {
                    if (ll.layerName === action.payload.name.layerName) {
                        ll.visible = !ll.visible
                    }
                    return ll
                })
                let layerString = layers.filter(x => x.visible)
                    .map(x => x.layerName)
                    .join(',')
                x.wms.getSource().updateParams({ 'LAYERS': layerString })
                x.layers = layers
            }
            return x
        })
        state = [...state]
    }
    else if (action.type === 'CHANGE_OPACITY') {
        state = state.map(x => {
            if (x.id === action.payload.id) {
                x.info.opacity = action.payload.value
                x.wms.setOpacity(x.info.opacity)
            }
            return x
        })

        return [...state]
    }
    else if (action.type === 'CHANGE_BASE_LAYER_VISIBILITY') {
        state = state.map(x => {
            if (x.id === action.payload.id) {
                x.info.visible = action.payload.visible
                x.wms.setVisible(x.info.visible)
            }
            return x
        })

        return [...state]
    }


    else {
        // console.log('reducer layers no action found')
    }
    return state
}