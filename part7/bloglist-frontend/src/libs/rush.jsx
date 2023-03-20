import { createContext, useContext, useMemo, useReducer } from 'react'

const StateContext = createContext()

export function RushProvider({ store, children }) {
  const initialState = {}
  const reducers = {}

  // get all the initial state values and reducers from store object
  Object.keys(store).forEach((key) => {
    initialState[key] = store[key].initialState
    reducers[key] = store[key].reducer
  })

  // merge reducer logic of all sub-reducers
  const rootReducer = (state, action) => {
    const updatedState = {}
    Object.keys(store).forEach((key) => {
      if (action.type.startsWith(key)) {
        // check if action.type matches the key
        updatedState[key] = reducers[key](state[key], action)
      } else {
        updatedState[key] = state[key] // otherwise, just copy over the old state
      }
    })
    return { ...state, ...updatedState }
  }

  const [state, dispatch] = useReducer(rootReducer, initialState)
  const value = useMemo(() => [state, dispatch], [state])

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  )
}

export function useSelector(selector) {
  const [state] = useContext(StateContext)
  return selector(state)
}

export function useDispatch() {
  const [, dispatch] = useContext(StateContext)
  return (input) => {
    if (typeof input === 'function') {
      input(dispatch)
    } else {
      dispatch(input)
    }
  }
}
