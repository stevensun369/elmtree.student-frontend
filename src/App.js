import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//student
import StudentIndex from './screens/StudentIndex'
import StudentHomeScreen from './screens/StudentHomeScreen'
import StudentSubjectScreen from './screens/StudentSubjectScreen'

// profile
import ProfileScreen from './screens/ProfileScreen'

// student update action
import { studentUpdate } from './actions/studentActions'
import TimetableScreen from './screens/TimetableScreen'

function App() {
  const dispatch = useDispatch()
  const studentLogin = useSelector((state) => state.studentLogin)

  useEffect(() => {
    if (studentLogin.studentInfo) {
      dispatch(studentUpdate())
    }
  }, [dispatch, studentLogin.studentInfo])

  return (
    <Router>
      {/* student */}
      <Route path='/' component={StudentIndex} exact />
      <Route path='/elev' component={StudentHomeScreen} exact />
      <Route
        path='/elev/:subjectID'
        component={StudentSubjectScreen}
        exact
      />

      <Route path='/orar' component={TimetableScreen} exact />

      {/* profil */}
      <Route path='/profil' component={ProfileScreen} exact />
    </Router>
  )
}

export default App
