const initialState = {
    isEdit: false,
}
export default (state = initialState, action) => {
    if (action.type === 'EDIT_MODE_CHANGED') {
        return Object.assign({}, state, { isEdit: action.payload })
    }
    return state;
}