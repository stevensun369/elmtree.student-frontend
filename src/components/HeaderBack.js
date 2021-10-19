import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/HeaderBack.module.css'

const HeaderBack = ({ backTo, children }) => {
  return (
    <header>
      <div className={styles.headerContainer}>
        <Link to={backTo}>
          <div className={styles.headerBackButton}>
            <img
              className={styles.headerBackButtonImg}
              src='/img/back-button.webp'
              alt='back-button'
            />
          </div>
        </Link>

        <div className={styles.headerTitle}>
          <span>{children}</span>
        </div>
      </div>
    </header>
  )
}

export default HeaderBack
