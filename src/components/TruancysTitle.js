import React from 'react'

import styles from '../css/MarksAndTruancysTitle.module.css'

const TruancysTitle = ({ children }) => {
  return (
    <div className={styles.title}>
      <span className={styles.titleSpan}>{children}</span>
    </div>
  )
}

export default TruancysTitle
