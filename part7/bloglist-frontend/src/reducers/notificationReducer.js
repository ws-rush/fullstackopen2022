import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: 'success',
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { setNotification, clearNotification } =
  notificationReducer.actions
export default notificationReducer.reducer

export function setNotificationWithTimeout(
  notification,
  type = 'success',
  timeout = 5
) {
  return async (dispatch) => {
    dispatch(setNotification({ message: notification, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}
