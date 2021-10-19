import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//student
import StudentLoginScreen from './screens/StudentLoginScreen'
import StudentHomeScreen from './screens/StudentHomeScreen'
import StudentSubjectScreen from './screens/StudentSubjectScreen'

// profile
import ProfileScreen from './screens/ProfileScreen'

// student update action
import { studentUpdate } from './actions/studentActions'

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
      <Route
        path='/conectare/elev'
        component={StudentLoginScreen}
        exact
      />
      <Route path='/elev' component={StudentHomeScreen} exact />
      <Route
        path='/elev/:subjectID'
        component={StudentSubjectScreen}
        exact
      />

      {/* profil */}
      <Route path='/profil' component={ProfileScreen} exact />
    </Router>
  )
}

export default App
