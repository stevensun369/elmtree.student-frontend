import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  studentLoginReducer,
  studentSubjectMarksReducer,
  studentSubjectTruancysReducer,
  studentAverageMarksReducer,
  studentTermMarksReducer,
} from './reducers/studentReducers'

const reducer = combineReducers({
  // student reducers
  studentLogin: studentLoginReducer,
  studentSubjectMarks: studentSubjectMarksReducer,
  studentSubjectTruancys: studentSubjectTruancysReducer,
  studentAverageMarks: studentAverageMarksReducer,
  studentTermMarks: studentTermMarksReducer,
})

const userTypeFromStorage = localStorage.getItem('userType')

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// student Logged in
var studentLoggedIn
var studentLoggedInInfo
var studentLoggedInGrade
var studentLoggedInSubjectList
var studentLoggedInToken

if (userTypeFromStorage === 'student') {
  studentLoggedIn = userFromStorage
  studentLoggedInInfo = {
    studentID: studentLoggedIn.studentID,
    firstName: studentLoggedIn.firstName,
    dadInitials: studentLoggedIn.dadInitials,
    lastName: studentLoggedIn.lastName,
    cnp: studentLoggedIn.cnp,
  }
  studentLoggedInGrade = studentLoggedIn.grade
  studentLoggedInSubjectList = studentLoggedIn.subjectList
  studentLoggedInToken = studentLoggedIn.token
}

const initialState = {
  studentLogin: {
    studentInfo: studentLoggedInInfo,
    grade: studentLoggedInGrade,
    subjectList: studentLoggedInSubjectList,
    token: studentLoggedInToken,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
