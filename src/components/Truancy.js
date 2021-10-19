import React from 'react'

import styles from '../css/Truancy.module.css'

const Truancy = ({ dateDay, dateMonth, motivated }) => {
  return (
    <>
      <div className={styles.listElementContainer}>
        <div className={styles.listElement}>
          <div className={styles.listElementDate}>
            {' '}
            <span className={styles.fontMono}>{dateDay}</span>
            {'.'}
            <span className={styles.fontSerif}>{dateMonth}</span>
          </div>
          <div className={styles.listElementMotivated}>
            {motivated ? (
              <div className={styles.listElementMotivatedTrue}>Motivată</div>
            ) : (
              <div className={styles.listElementMotivatedFalse}>
                <span>Nemotivată</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='list-divider'></div>
    </>
  )
}

export default Truancy
