import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../../css/HeaderFull/HeaderFullDesktop.module.css'

const HeaderFullDesktop = () => {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogoContainer}>
          <div className={styles.headerLogo}>
            <img
              src='/img/tree.green.webp'
              alt='elmtree logo'
              className={styles.headerLogoImg}
            />
          </div>
          <div className={styles.headerLogoText}>
            <div className={styles.headerLogoTextSpan}>elmtree</div>
          </div>
        </div>

        <div className={styles.headerLinksContainer}>
          <Link to='/profil'>
            {' '}
            <div className={styles.headerProfile}>
              <img
                src='/img/profile-user.webp'
                alt=''
                className={styles.headerProfileImg}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default HeaderFullDesktop
