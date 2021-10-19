import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, style }) => {
  return (
    <Alert style={{ ...style, marginTop: '2vh' }} variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
