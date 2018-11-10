export const loadState = () => {
    try {
        const serialized = localStorage.getItem('state')
        if (!serialized) {
            return undefined
        }
        return JSON.parse(serialized)
    } catch (error) {
        return undefined
    }
}
export const saveState = (state) => {
    try {
        const serialized = JSON.stringify(state)
        localStorage.setItem('state', serialized)
    } catch (error) {
        
    }
}