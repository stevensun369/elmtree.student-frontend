import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/NotAuthorized.module.css'

const NotAuthorized = () => {
  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        <div className={styles.logoRow}>
          <img src='/img/tree.green.webp' alt='' className={styles.logoImg} />
        </div>
        <div className={styles.logoRow}>
          <span className={styles.logoText}>elmtree</span>
        </div>
      </div>
      <p className={styles.cardText}>
        A apărut o eroare. Înapoi la pagina de acasă:
      </p>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className={styles.buttonHome}>Acasă</div>
      </Link>
    </div>
  )
}

export default NotAuthorized
