import { initialData } from '../config'
export default (state = [], action) => {
    if (action.type === 'CHANGE_BASEMAP_OPACITY') {
        const { basemap, opacity } = action.payload
        const index = state.indexOf(basemap)
        const newBasemap = Object.assign({}, basemap, { opacity })
        state[index] = newBasemap
        return Object.assign([], state)
    }
    else if (action.type === 'CHANGE_ACTIVE_BASEMAP') {
        const { basemap } = action.payload
        if(basemap.visible){
            return state
        }
        const oldActiveBasemap = state.find(l => l.visible)
        const oldActiveBasemapIndex = state.indexOf(oldActiveBasemap)
        state[oldActiveBasemapIndex] = Object.assign({}, oldActiveBasemap, {visible: false})

        const index = state.indexOf(basemap)
        state[index] = Object.assign({}, basemap, {visible: true})
        return Object.assign([], state)
    }
    else if (action.type === 'RESET_LAYERS') {
        return Object.assign([], initialData().basemaps)
    }
    return state
}