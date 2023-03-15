import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RushProvider } from './libs/rush'
import notificationReducer from './reducers/notificationReducer'

import App from './App'
import counterReducer from './reducers/counterReducer'

const queryClient = new QueryClient()
const store = {
  notification: notificationReducer,
  counter: counterReducer
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RushProvider store={store}>
      <App />
    </RushProvider>
  </QueryClientProvider>
)