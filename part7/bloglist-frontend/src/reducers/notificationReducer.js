import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
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

export default notificationReducer.reducer
export const { setNotification, clearNotification } =
  notificationReducer.actions

export function setNotificationWithTimeout(
  message,
  type = 'success',
  time = 5
) {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}
