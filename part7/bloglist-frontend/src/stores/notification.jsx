import { createContext, useMemo, useState } from 'react'

const Context = createContext()

function Provider({ children }) {
  const [state, set] = useState(null)
  const value = useMemo(() => ({
    state,
    notify: (message, type='success', time=5) => {
      set({ message, type })
      setTimeout(() => set(null), time * 1000)
    }
  }), [state])

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default { Context, Provider }
