import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../../css/HeaderFull/HeaderFullMobile.module.css'

const HeaderFullMobile = () => {
  return (
    <header>
      <div className={styles.headerBackButtonContainer}></div>

      <div className={styles.headerLogoContainer}>
        <div className={styles.headerLogo}>
          <img
            src='/img/tree.green.webp'
            alt='logo'
            className={styles.headerLogoImg}
          />
        </div>
      </div>

      <div className={styles.headerLinksContainer}>
        <Link to={`/profil`}>
          <div className={styles.headerProfile}>
            <img
              src='/img/profile-user.webp'
              alt='profile'
              className={styles.headerProfileImg}
            />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default HeaderFullMobile
