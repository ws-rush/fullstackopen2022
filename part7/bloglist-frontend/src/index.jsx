import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import notificationReducer from './reducers/notificationReducer'
import { configureStore, Provider } from './libs/rush'
import userReducer from './reducers/userReducer'

const queryClient = new QueryClient()
const store = configureStore({
  notification: notificationReducer,
  user: userReducer,
  blogs: { initialState: [] },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)
