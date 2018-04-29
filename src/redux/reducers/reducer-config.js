export default function (state = {}, action) {
    state = Object.assign({}, state)
    if (action.type === 'SET_POPUP') {
        state.popup = action.payload
        if (state.map !== undefined) {
            state.map.addOverlay(state.popup)
        }
    } else if (action.type === 'SET_MAP') {
        state.map = action.payload
        if (state.popup !== undefined) {
            state.map.addOverlay(state.popup)
        }
    }

    return state
}