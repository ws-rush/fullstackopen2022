import React from 'react'
import ReactDOM from 'react-dom/client'

import counterReducer from './reducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// a proper place to define a component
const Statistics = () => {
  const { good, ok, bad } = store.getState()
  if (good+ok+bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="ok" value={ok} />
        <StatisticLine text="bad" value={bad} />
        {/* <StatisticLine text="all" value={props.good+props.neutral+props.bad} />
        <StatisticLine text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
        <StatisticLine text="positive" value={props.good/(props.good+props.neutral+props.bad)*100 + ` %`} /> */}
      </tbody>
    </table>
  )
}

function App() {
  return (
    <div>
      <button onClick={() => { store.dispatch({ type: 'GOOD' }) }}>good</button>
      <button onClick={() => { store.dispatch({ type: 'OK' }) }}>ok</button>
      <button onClick={() => { store.dispatch({ type: 'BAD' }) }}>bad</button>
      <button onClick={() => { store.dispatch({ type: 'ZERO' }) }}>zero</button>
      <Statistics />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

function renderApp() {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)