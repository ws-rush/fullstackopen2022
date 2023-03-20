import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    nottification: notificationReducer,
  },
})

const storedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
let storedUser = null
if (storedUserJSON) {
  storedUser = JSON.parse(storedUserJSON)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App storeduser={storedUser} />
  </Provider>
)
