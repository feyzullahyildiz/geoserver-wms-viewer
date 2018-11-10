import { createStore, combineReducers } from 'redux';
import LayerReducer from './reducers/reducer-layers'

import { initialData } from './config'
import { saveState, loadState } from './state-store-manager'

const combined = combineReducers({
    layers: LayerReducer
})
const store = createStore(combined, loadState() || initialData,
    window.devToolsExtension && window.devToolsExtension())

store.subscribe(() => {
    saveState(store.getState())
})
export default store

