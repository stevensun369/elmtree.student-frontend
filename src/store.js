import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  studentLoginReducer,
  studentSubjectMarksReducer,
  studentSubjectTruancysReducer,
  studentAverageMarksReducer,
  studentTermMarksReducer,
  studentTimetableReducer,
} from './reducers/studentReducers'
import { getAverageMarks } from './utils/averageMarks'
import { getTermMarks } from './utils/termMarks'

const reducer = combineReducers({
  // student reducers
  studentLogin: studentLoginReducer,
  studentSubjectMarks: studentSubjectMarksReducer,
  studentSubjectTruancys: studentSubjectTruancysReducer,
  studentAverageMarks: studentAverageMarksReducer,
  studentTermMarks: studentTermMarksReducer,
  studentTimetable: studentTimetableReducer,
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

window.onload = async () => {
  var iframe = document.getElementsByTagName('iframe')[0]
  var win
  try {
    win = iframe.contentWindow
  } catch (e) {
    win = iframe.contentWindow
  }
  win.postMessage('', '*')
  let requestData
  window.onmessage = (e) => {
    requestData = e.data
    console.log(requestData.userType)

    if (requestData.userType !== 'student' && requestData.userType) {
      // window.location.replace('https://google.com')
      // alert('not teacher')
    }

    var teacherID = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')).teacherID
      : null

    if (teacherID !== JSON.parse(requestData.userInfo).teacherID) {
      localStorage.setItem('userType', requestData.userType)
      localStorage.setItem('userInfo', requestData.userInfo)
      store.dispatch({
        type: 'STUDENT_READ_LS',
        payload: JSON.parse(requestData.userInfo),
      })
      getAverageMarks(store.dispatch, store.getState)
      getTermMarks(store.dispatch, store.getState)
    }
  }
}

export default store
