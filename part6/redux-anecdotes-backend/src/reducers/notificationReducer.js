import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state) {
            return null
        },
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export function setTimedNotification(message, time) {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}