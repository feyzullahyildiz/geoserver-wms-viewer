import { createStore, combineReducers } from 'redux';
import LayerReducer from './reducers/reducer-layers'

import { initialData } from './config'
const combined = combineReducers({
    layers: LayerReducer
})
const store = createStore(combined, initialData,
    window.devToolsExtension && window.devToolsExtension())

export default store

