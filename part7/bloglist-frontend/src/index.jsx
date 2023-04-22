import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PureProvider } from './zux'
import App from './App'
import notification from './stores/notification'
import user from './stores/user'

const queryClient = new QueryClient()
const store = { notification, user }

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <PureProvider store={store}>
      <App />
    </PureProvider>
  </QueryClientProvider>
)
