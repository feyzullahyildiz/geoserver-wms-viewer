export function setPopup(obj) {
    return {
        type: 'SET_POPUP',
        payload: obj
    }
}
export function setMap(map) {
    return {
        type: 'SET_MAP',
        payload: map
    }
}