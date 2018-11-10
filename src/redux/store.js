import { createStore, combineReducers } from 'redux';
import LayerReducer from './reducers/reducer-layers'
import ConfigReducer from './reducers/reducer-config'

import { initialData } from './config'
import { saveState, loadState } from './state-store-manager'

const combined = combineReducers({
    layers: LayerReducer,
    config: ConfigReducer,
})
const store = createStore(combined, Object.assign(initialData, { layers: loadState() }),
    window.devToolsExtension && window.devToolsExtension())

store.subscribe(() => {
    saveState(store.getState().layers)
})
export default store

