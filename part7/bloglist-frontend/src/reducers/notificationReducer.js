// notification reducer
const notificationReducer = {
  name: 'notification',
  initialState: {
    message: null,
    type: null,
  },
  reducer: (state, action) => {
    switch (action.type) {
    case 'notification/setNotification':
      return action.payload
    case 'notification/clearNotification':
      return null
    default:
      return state
    }
  },
}

export default notificationReducer

export function setNotificationWithTimeout(
  message,
  type = 'success',
  time = 5
) {
  return async (dispatch) => {
    dispatch({
      type: 'notification/setNotification',
      payload: {
        message,
        type,
      },
    })
    setTimeout(() => {
      dispatch({ type: 'notification/clearNotification' })
    }, time * 1000)
  }
}
