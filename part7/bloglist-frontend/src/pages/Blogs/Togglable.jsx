import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Stack } from '@mui/material'

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
        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={toggleVisability}
        >
          {buttonLabel}
        </Button>
      </div>
    )
  }

  return (
    <Stack className="togglableContent">
      {children}
      <Button type="button" color="secondary" onClick={toggleVisability}>
        cancel
      </Button>
    </Stack>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
