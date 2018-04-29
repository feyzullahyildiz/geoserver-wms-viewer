import { createStore, combineReducers } from 'redux';
import LayerReducer from './reducers/reducer-layers'

const combined = combineReducers({
    layers :LayerReducer
})
const store = createStore(combined, {}, 
window.devToolsExtension && window.devToolsExtension())

export default store

