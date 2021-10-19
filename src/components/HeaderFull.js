import React from 'react'

import HeaderFullMobile from './HeaderFull/HeaderFullMobile'
import HeaderFullDesktop from './HeaderFull/HeaderFullDesktop'

const Header = ({ text }) => {
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  return <>{mobile ? <HeaderFullMobile /> : <HeaderFullDesktop />}</>
}

export default Header
