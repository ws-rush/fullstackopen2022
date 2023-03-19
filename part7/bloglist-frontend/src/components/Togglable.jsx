import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisability = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => ({
    toggleVisability,
  }))

  if (!visible) {
    return (
      <div>
        <button type="button" onClick={toggleVisability}>
          {buttonLabel}
        </button>
      </div>
    )
  }

  return (
    <div className="togglableContent">
      {children}
      <button type="button" onClick={toggleVisability}>
        cancel
      </button>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
