import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/Truancy.module.css'

const TruancyModifiable = ({
  dateDay,
  dateMonth,
  motivated,
  motivateLinkTo,
}) => {
  return (
    <>
      <div className={styles.listElementContainer}>
        <div className={styles.listElement}>
          <div className={styles.listElementDate}>
            <span className={styles.fontMono}>{dateDay}</span>
            {'.'}
            <span className={styles.fontSerif}>{dateMonth}</span>
          </div>
          <div className={styles.listElementMotivated}>
            {motivated ? (
              <div className={styles.listElementMotivatedTrue}>Motivată</div>
            ) : (
              <Link to={motivateLinkTo} style={{ textDecoration: 'none' }}>
                <div className={styles.listElementMotivatedFalse}>
                  <img
                    className={styles.listElementMotivatedFalseImg}
                    src='/img/motivate.truancy.webp'
                    alt=''
                  />
                  <span>Nemotivată</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='list-divider'></div>
    </>
  )
}

export default TruancyModifiable
