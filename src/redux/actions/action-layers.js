// let id = 0
// export function addLayer(wms, info, name) {
//     id += 1
//     return{
//         type: 'ADD_LAYER',
//         payload:{
//             wms, info, name, id
//         }

//     }
// }
// export function changeVisiblity(name, id){
//     return{
//         type: 'CHANGE_VISIBILITY',
//         payload: {
//             name, id
//         }
//     }
// }
// export function changeOpacity(id, value){
//     return{
//         type: 'CHANGE_OPACITY',
//         payload: {
//             value, id
//         }
//     }
// }
// export function changeBaseLayerVisibility(visible, id){
//     return{
//         type :'CHANGE_BASE_LAYER_VISIBILITY',
//         payload: {
//             visible, id
//         }
//     }
// }
export const changeNestedLayerProperty = (layer, nestedLayer, property) => {
    return {
        type: 'CHANGE_NESTED_LAYER_PROPERTY',
        payload: {
            layer, nestedLayer, property
        }
    }
}
export const changeLayerProperty = (layer, property) => {
    return {
        type: 'CHANGE_LAYER_PROPERTY',
        payload: {
            layer, property
        }
    }
}