export function setFeatures(features, position) {
    // console.log('action-features features', features)
    return {
        type: 'SET_FEATURES',
        payload: {
            features, position
        }
    }
}