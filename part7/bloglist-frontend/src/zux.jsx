import { createContext, useContext, useState, useMemo } from 'react'

const StateContext = createContext()

export function defineStore({ initialState, setters }) {
  const Context = createContext()

  return {
    Context,
    Provider: ({ children }) => {
      const [state, set] = useState(initialState)
      const value = useMemo(() => ({ state, ...setters(set) }), [state])
      return <Context.Provider value={value}>{children}</Context.Provider>
    },
  }
}

function BuildProviderTree(providers) {
  if (providers.length === 1) {
    return providers[0]
  }

  const A = providers.shift()
  const B = providers.shift()
  return BuildProviderTree([
    ({ children }) => (
      <A>
        <B>{children}</B>
      </A>
    ),
    ...providers,
  ])
}

export function PureProvider({ store, children }) {
  const providers = []
  Object.keys(store).forEach((name) => {
    providers.push(store[name].Provider)
  })
  const ProviderTree = BuildProviderTree(providers)

  return (
    <ProviderTree>
      <StateContext.Provider value={store}>{children}</StateContext.Provider>
    </ProviderTree>
  )
}

export function useStore(storeName) {
  if (!storeName) throw new Error('store name is required in useStore')
  const stores = useContext(StateContext)
  const store = useContext(stores[storeName].Context)
  return store

}