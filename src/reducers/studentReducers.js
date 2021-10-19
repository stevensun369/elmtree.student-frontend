import {
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_UPDATE,
  STUDENT_LOGOUT,
  STUDENT_SUBJECT_MARKS_REQUEST,
  STUDENT_SUBJECT_MARKS_SUCCESS,
  STUDENT_SUBJECT_MARKS_FAIL,
  STUDENT_SUBJECT_MARKS_DELETE,
  STUDENT_SUBJECT_TRUANCYS_REQUEST,
  STUDENT_SUBJECT_TRUANCYS_SUCCESS,
  STUDENT_SUBJECT_TRUANCYS_FAIL,
  STUDENT_SUBJECT_TRUANCYS_DELETE,
  STUDENT_GET_AVERAGE_REQUEST,
  STUDENT_GET_AVERAGE_SUCCESS,
  STUDENT_GET_AVERAGE_FAIL,
  STUDENT_GET_TERM_MARKS_REQUEST,
  STUDENT_GET_TERM_MARKS_SUCCESS,
  STUDENT_GET_TERM_MARKS_FAIL,
} from '../constants/studentConstants'

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true }
    case STUDENT_LOGIN_SUCCESS:
      const studentInfoDestructure = {
        studentID: action.payload.studentID,
        firstName: action.payload.firstName,
        dadInitials: action.payload.dadInitials,
        lastName: action.payload.lastName,
        cnp: action.payload.cnp,
      }
      return {
        loading: false,
        studentInfo: studentInfoDestructure,
        grade: action.payload.grade,
        subjectList: action.payload.subjectList,
        token: action.payload.token,
      }
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    // case STUDENT_UPDATE_GRADE:
    //   return { ...state, grade: action.payload }
    // case STUDENT_UPDATE_SUBJECT_LIST:
    //   return { ...state, subjectList: action.payload }
    case STUDENT_UPDATE:
      return {
        ...state,
        grade: action.payload.grade,
        subjectList: action.payload.subjectList,
        token: action.payload.token,
      }
    case STUDENT_LOGOUT:
      return {}
    default:
      return state
  }
}

export const studentSubjectMarksReducer = (
  state = { subjectMarksList: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_SUBJECT_MARKS_REQUEST:
      return { loading: true, subjectMarksList: [] }
    case STUDENT_SUBJECT_MARKS_SUCCESS:
      return { loading: false, subjectMarksList: action.payload }
    case STUDENT_SUBJECT_MARKS_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_SUBJECT_MARKS_DELETE:
      return { loading: true, subjectMarksList: [] }
    default:
      return state
  }
}

export const studentSubjectTruancysReducer = (
  state = { subjectTruancysList: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_SUBJECT_TRUANCYS_REQUEST:
      return { loading: true, subjectTruancysList: [] }
    case STUDENT_SUBJECT_TRUANCYS_SUCCESS:
      return { loading: false, subjectTruancysList: action.payload }
    case STUDENT_SUBJECT_TRUANCYS_FAIL:
      return { loading: false, error: action.payload }
    case STUDENT_SUBJECT_TRUANCYS_DELETE:
      return { loading: true, subjectTruancysList: [] }
    default:
      return state
  }
}

export const studentAverageMarksReducer = (
  state = { averageMarks: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_GET_AVERAGE_REQUEST:
      return { loading: true, averageMarks: [] }
    case STUDENT_GET_AVERAGE_SUCCESS:
      return { loading: false, averageMarks: action.payload }
    case STUDENT_GET_AVERAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const studentTermMarksReducer = (
  state = { termMarks: [] },
  action
) => {
  switch (action.type) {
    case STUDENT_GET_TERM_MARKS_REQUEST:
      return { loading: true, termMarks: [] }
    case STUDENT_GET_TERM_MARKS_SUCCESS:
      return { loading: false, termMarks: action.payload }
    case STUDENT_GET_TERM_MARKS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
