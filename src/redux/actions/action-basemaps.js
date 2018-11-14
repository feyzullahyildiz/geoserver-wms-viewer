export const changeBasemapOpacity = (basemap, opacity) => {
    return {
        type: 'CHANGE_BASEMAP_OPACITY',
        payload: {
            basemap, opacity
        }
    }
}
export const changeActiveBasemap = (basemap) => {
    return {
        type: 'CHANGE_ACTIVE_BASEMAP',
        payload: {
            basemap
        }
    }
}