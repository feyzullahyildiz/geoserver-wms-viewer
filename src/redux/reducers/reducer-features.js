export default function(state = {}, action){
    // console.log('action', action)
    if(action.type === 'SET_FEATURES'){
        state = action.payload
    }else{
        // console.log('features reducers, action not found')
    }

    return state
}