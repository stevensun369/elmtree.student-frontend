import React from 'react'

import styles from '../css/Mark.module.css'

const Mark = ({ dateDay, dateMonth, children }) => {
  return (
    <>
      <div className={styles.listElementContainer}>
        <div className={styles.listElement}>
          <div className={styles.listElementDate}>
            <span className={styles.fontMono}>{dateDay}</span>
            {'.'}
            <span className={styles.fontSerif}>{dateMonth}</span>
          </div>
          <div className={styles.listElementValue}>{children}</div>
        </div>
      </div>
      <div className='list-divider'></div>
    </>
  )
}

export default Mark
