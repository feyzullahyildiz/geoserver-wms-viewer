import { createStore, combineReducers } from 'redux';
import LayerReducer from './reducers/reducer-layers'
// import FeaturesReducer from './reducers/reducer-features'
// import ConfigReducer from './reducers/reducer-config'
import { initialData } from './config'
const combined = combineReducers({
    layers: LayerReducer,
    // features: FeaturesReducer,
    // config: ConfigReducer,
})
const store = createStore(combined, initialData,
    window.devToolsExtension && window.devToolsExtension())

export default store

