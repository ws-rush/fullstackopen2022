import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(function Toggilable({ buttonLabel, children }, refs) {
  const [visible, setVisible] = useState(false)

  const toggleVisability = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisability
    }
  })

  if (!visible) {
    return (
      <div>
        <button onClick={toggleVisability}>{buttonLabel}</button>
      </div>
    )
  }

  return (
    <div>
      {children}
      <button onClick={toggleVisability}>cancel</button>
    </div>
  )
})

export default Togglable