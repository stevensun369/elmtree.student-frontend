import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/MarksAndTruancysTitle.module.css'

const MarksTitle = ({ children, toAverageMark, averageMark }) => {
  return (
    <div className={styles.title}>
      <span className={styles.titleSpan}>{children}</span>
      {toAverageMark && !averageMark && (
        <Link to={toAverageMark}>
          <div className={styles.buttonTo}>
            <span className={styles.buttonToSpan}>Incheie media</span>
          </div>
        </Link>
      )}

      {averageMark && (
        <div className={styles.averageMark}>
          <span className={styles.averageMarkSpan}>{averageMark}</span>
        </div>
      )}
    </div>
  )
}

export default MarksTitle
