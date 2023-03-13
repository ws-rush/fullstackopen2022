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

export default notificationSlice.reducer
export const { setNotification, clearNotification } = notificationSlice.actions