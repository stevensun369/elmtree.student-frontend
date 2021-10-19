import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../css/ListItem.module.css'

const SubjectItem = ({
  children,
  linkTo,
  averageMarkTermOne,
  averageMarkTermTwo,
}) => {
  return (
    <Link to={linkTo} style={{ textDecoration: 'none', color: 'var(--green)' }}>
      <div className={styles.subjectElement}>
        <span className={styles.subjectElementSpan}>{children}</span>

        <div className={styles.averageMarks}>
          <div className={styles.averageMarksTermContainer}>
            <div className={styles.averageMarksTerm}>
              <div className={styles.averageMarksTermSpan}>Sem. I:</div>
              <div className={styles.averageMark}>
                <span className={styles.averageMarkSpan}>
                  {averageMarkTermOne !== 0 && averageMarkTermOne ? (
                    <>{averageMarkTermOne}</>
                  ) : (
                    <>-</>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.averageMarksTermContainer}>
            <div className={styles.averageMarksTerm}>
              <div className={styles.averageMarksTermSpan}>Sem. II:</div>
              <div className={styles.averageMark}>
                <span className={styles.averageMarkSpan}>
                  {averageMarkTermTwo !== 0 && averageMarkTermTwo ? (
                    <>{averageMarkTermTwo}</>
                  ) : (
                    <>-</>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SubjectItem
