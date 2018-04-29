let id = 0
export function addLayer(wms, info, name) {
    id += 1
    return{
        type: 'ADD_LAYER',
        payload:{
            wms, info, name, id
        }

    }
}
export function changeVisiblity(name, parent){
    // console.log('name', name)
    // console.log('parent', parent)
    return{
        type: 'CHANGE_VISIBILITY',
        payload: {
            name, parent
        }
    }
}
export function changeOpacity(id, value){
    return{
        type: 'CHANGE_OPACITY',
        payload: {
            value, id
        }
    }
}

