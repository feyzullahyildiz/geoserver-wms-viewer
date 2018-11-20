import { createStore, combineReducers } from 'redux';
import {LayerReducer} from './reducers/reducer-layers'
import {ConfigReducer} from './reducers/reducer-config'
import {BasemapReducer} from './reducers/reducer-basemaps'
import {MapSettingsReducer} from './reducers/reducer-mapsettings'

import { initialData } from './config'
import { saveState, loadState } from './state-store-manager'

const combined = combineReducers({
    layers: LayerReducer,
    config: ConfigReducer,
    basemaps: BasemapReducer,
    mapSettings: MapSettingsReducer,
})
const state = initialData()
const storedLayers = loadState()
if (storedLayers && storedLayers.layers && storedLayers.basemaps) {
    Object.assign(state, storedLayers)
}

const store = createStore(combined, state,
    window.devToolsExtension && window.devToolsExtension())

store.subscribe(() => {
    let state = store.getState()
    saveState({ layers: state.layers, basemaps: state.basemaps, mapSettings: state.mapSettings })
})
export { store }

