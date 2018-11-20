const initialData = {
    center: undefined,
    zoom: undefined
}
export const MapSettingsReducer =  (state = initialData, action) => {
    if(action.type === 'SET_MAP_DEFAULT_POSITON'){
        return Object.assign({}, state, action.payload)
    }
    return state
}