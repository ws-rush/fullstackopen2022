// single state library
// TODO: add multiple stores support
// TODO: support name space
import { createContext, useContext, useReducer } from "react";

// pass default value, if user doesnt pass it
const StateContext = createContext()

// custom component for context pass reducer
export function RushProvider({ store, children }) {
  const [state, dispatch] = useReducer(store.reducer, store.initialState)
  return (
    <StateContext.Provider value={{state, dispatch}}>
      {children}
    </StateContext.Provider>
  )
}

// custom hooks get reducer functions
export function useSelector(selector) {
  const { state } = useContext(StateContext)
  return selector(state)
}

export function useDispatch() {
  const { dispatch } = useContext(StateContext)
  return (input) => {
    if (typeof input === 'function') {
        input(dispatch)
    } else {
        dispatch(input)
    }
  }
}