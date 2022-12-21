import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
    <div className='togglableContent'>
      {children}
      <button onClick={toggleVisability}>cancel</button>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable