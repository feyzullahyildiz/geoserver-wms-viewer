const initialData = {
    center: undefined,
    zoom: undefined
}
export default (state = initialData, action) => {
    if(action.type === 'SET_MAP_DEFAULT_POSITON'){
        return Object.assign({}, state, action.payload)
    }
    return state
}