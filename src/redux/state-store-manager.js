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
let timeoutID
export const saveState = (state) => {
    try {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            const serialized = JSON.stringify(state)
            localStorage.setItem('state', serialized)
        }, 1000)
    } catch (error) {

    }
}