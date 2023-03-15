const notificationReducer = {
    name: 'notification',
    initialState: null,
    reducer: (state, action) => {
        console.log('notification', state, action)
        switch (action.type) {
            case `notification/setNotification`:
                return action.payload
            case `notification/clearNotification`:
                return null
            default:
                return state
        }
    }
}

export default notificationReducer

export function setTimedNotification(message, time) {
    return async dispatch => {
        dispatch({ type: 'notification/setNotification', payload: message })
        setTimeout(() => {
            dispatch({ type: 'notification/clearNotification' })
        }, time * 1000)
    }
}