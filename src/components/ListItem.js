import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/ListItem.module.css'

const ListItem = ({ children, linkTo }) => {
  return (
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
      <div className={styles.listElement}>
        <span className={styles.listElementSpan}>{children}</span>
      </div>

      <div className={styles.listDivider}></div>
    </Link>
  )
}

export default ListItem
