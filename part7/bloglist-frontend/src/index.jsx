import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import { RushProvider } from './libs/rush'
import userReducer from './reducers/userReducer'

const queryClient = new QueryClient()
const store = {
  notification: notificationReducer,
  user: userReducer,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RushProvider store={store}>
      <App />
    </RushProvider>
  </QueryClientProvider>
)
