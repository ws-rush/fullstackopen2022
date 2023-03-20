import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from 'react'

const StateContext = createContext()

export function createSlice(slice) {
  const { reducers } = slice
  reducers.set = (state, action) => action.payload
  const actions = {}
  Object.keys(reducers).forEach((key) => {
    actions[key] = (payload) => ({ type: `${slice.name}/${key}`, payload })
  })

  return {
    reducer: {
      name: slice.name,
      initialState: slice.initialState,
      reducer: (state, action) => {
        // call states which start in form `name/action.type`
        const type = action.type.slice(slice.name.length + 1)
        if (reducers[type]) {
          return reducers[type](state, action)
        }
        return state
      },
    },
    actions,
  }
}

export function configureStore(store) {
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
      if (!reducers[key]) return
      if (action.type.startsWith(key)) {
        // check if action.type matches the key
        updatedState[key] = reducers[key](state[key], action)
      } else {
        updatedState[key] = state[key] // otherwise, just copy over the old state
      }
    })
    return { ...state, ...updatedState }
  }

  return [rootReducer, initialState]
}

export function Provider({ store, children }) {
  const [state, dispatch] = useReducer(...store)
  const value = useMemo(() => [state, dispatch], [state])

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  )
}

export function useSelector(selector) {
  const [state] = useContext(StateContext)
  const slectorCallback = useCallback(selector, [])
  return slectorCallback(state)
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

export function useStore(storeName) {
  const [state, dispatch] = useContext(StateContext)
  return {
    state: state[storeName],
    set: (data) => dispatch({ type: `${storeName}/set`, payload: data }),
  }
}

const mutateReducer = (state, action) => {
  switch (action.type) {
  case 'mutate/start':
    return {
      ...state,
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: null,
    }
  case 'mutate/success':
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      data: action.payload,
    }
  case 'mutate/error':
    return {
      ...state,
      isLoading: false,
      isError: true,
      error: action.payload,
    }
  default:
    return state
  }
}

// create mutate function whic work as react-query's mutate
// useMutate accept store name and action function and options of {onSuccess, onError}
// useMutate return object with mutate function and mutate state and data and isLoading, isError
export function useMutate(excute, { onSuccess, onError } = {}) {
  const [state, dispatch] = useReducer(mutateReducer, {
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    data: null,
  })

  const mutate = useCallback(
    async (payload) => {
      dispatch({ type: 'mutate/start' })
      try {
        const result = await excute(payload)
        dispatch({ type: 'mutate/success', payload: result })
        if (onSuccess) onSuccess(result)
      } catch (error) {
        dispatch({ type: 'mutate/error', payload: error })
        if (onError) onError(error)
      }
    },
    [excute, onSuccess, onError]
  )

  return { ...state, mutate }
}
