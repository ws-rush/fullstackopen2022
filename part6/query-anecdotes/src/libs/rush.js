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
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}

// ustom hooks get reducer functions
export function useSelector(selector) {
  const result = useContext(StateContext)
  return selector(result[0])
}

export function useDispatch() {
  const result = useContext(StateContext)
  return (input) => {
    console.log(input)
    if (typeof input === 'function') {
        input(result[1])
    } else {
        result[1](input)
    }
  }
}