import {
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
  STUDENT_AVERAGE_MARKS_REQUEST,
  STUDENT_AVERAGE_MARKS_SUCCESS,
  STUDENT_AVERAGE_MARKS_FAIL,
  STUDENT_TERM_MARKS_REQUEST,
  STUDENT_TERM_MARKS_SUCCESS,
  STUDENT_TERM_MARKS_FAIL,
  STUDENT_FINAL_MARKS_REQUEST,
  STUDENT_FINAL_MARKS_SUCCESS,
  STUDENT_FINAL_MARKS_FAIL,
  STUDENT_TIMETABLE_REQUEST,
  STUDENT_TIMETABLE_SUCCESS,
  STUDENT_TIMETABLE_FAIL,
  STUDENT_TIMETABLE_TEACHERS_REQUEST,
  STUDENT_TIMETABLE_TEACHERS_SUCCESS,
  STUDENT_TIMETABLE_TEACHERS_FAIL,
  STUDENT_SCHOOL_REQUEST,
  STUDENT_SCHOOL_SUCCESS,
  STUDENT_SCHOOL_FAIL,
} from '../constants/studentConstants'
import { apiURL } from '../env'
import axios from 'axios'

export const studentLogout = () => async (dispatch) => {
  dispatch({
    type: STUDENT_LOGOUT,
  })

  localStorage.removeItem('userInfo')
  localStorage.removeItem('userType')
}

export const studentUpdate = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().studentLogin.token}`,
      },
    }

    var ls = JSON.parse(localStorage.getItem('userInfo'))

    const update = await axios.get(
      `${apiURL}/api/student/update`,
      config
    )

    dispatch({
      type: STUDENT_UPDATE,
      payload: update.data,
    })

    ls.grade = update.data.grade
    ls.subjectList = update.data.subjectList
    ls.token = update.data.token

    localStorage.setItem('userInfo', JSON.stringify(ls))
  } catch (error) {}
}

export const getStudentSubjectMarks =
  (subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_SUBJECT_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().studentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/marks/${subjectID}`,
        config
      )

      dispatch({
        type: STUDENT_SUBJECT_MARKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_SUBJECT_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getStudentSubjectTruancys =
  (subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_SUBJECT_TRUANCYS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().studentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/truancies/${subjectID}`,
        config
      )

      dispatch({
        type: STUDENT_SUBJECT_TRUANCYS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_SUBJECT_TRUANCYS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteMarksAndTruancys = () => async (dispatch) => {
  dispatch({
    type: STUDENT_SUBJECT_MARKS_DELETE,
  })

  dispatch({
    type: STUDENT_SUBJECT_TRUANCYS_DELETE,
  })
}

export const studentGetAverageMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_AVERAGE_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().studentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/averagemarks`,
        config
      )

      var subjectList = getState().studentLogin.subjectList
      var subject

      var subjectIDList = []
      for (subject in subjectList) {
        subjectIDList.push(subjectList[subject].subjectID)
      }

      var averageMarks = {}

      for (subject in subjectIDList) {
        averageMarks[subjectIDList[subject]] = []

        var subjectID = subjectIDList[subject]

        for (var averageMark in data) {
          if (data[averageMark].subject.subjectID === subjectID) {
            averageMarks[subjectIDList[subject]].push(
              data[averageMark]
            )
          }
        }
      }

      dispatch({
        type: STUDENT_AVERAGE_MARKS_SUCCESS,
        payload: averageMarks,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_AVERAGE_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const studentGetTermMarks =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_TERM_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().studentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/termmarks`,
        config
      )

      var termMarks = []
      for (var termMark in data) {
        if (data[termMark].term === 1) {
          termMarks[0] = data[termMark].value
        }
        if (data[termMark].term === 2) {
          termMarks[1] = data[termMark].value
        }
      }

      dispatch({
        type: STUDENT_TERM_MARKS_SUCCESS,
        payload: termMarks,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_TERM_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getTimetable = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_TIMETABLE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().studentLogin.token}`,
      },
    }

    const { data } = await axios.get(
      `${apiURL}/api/student/timetable`,
      config
    )

    var days = [1, 2, 3, 4, 5]
    // var intervals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    var periods = {}

    for (var dayKey in days) {
      var day = days[dayKey]
      periods[day] = {}
    }

    for (var key in data) {
      var period = data[key]
      periods[period.day][period.interval] = period
    }

    dispatch({
      type: STUDENT_TIMETABLE_SUCCESS,
      payload: periods,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_TIMETABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getTimetableTeachers =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_TIMETABLE_TEACHERS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().studentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/timetable/teachers`,
        config
      )

      let subjectList = getState().studentLogin.subjectList
      let subjectIDList = []
      for (let subject in subjectList) {
        subjectIDList.push(subjectList[subject].subjectID)
      }

      var teachers = {}
      for (var subjectID in subjectIDList) {
        teachers[subjectIDList[subjectID]] = []
      }

      for (let subjectIDIndex in subjectIDList) {
        let subjectID = subjectIDList[subjectIDIndex]
        for (let teacherIndex in data) {
          let teacher = data[teacherIndex]
          for (let subjectIndex in teacher.subjectList) {
            let subject = teacher.subjectList[subjectIndex]
            if (subject.subjectID === subjectID) {
              teachers[subject.subjectID].push(
                teacher.firstName + ' ' + teacher.lastName
              )
            }
          }
        }
      }

      dispatch({
        type: STUDENT_TIMETABLE_TEACHERS_SUCCESS,
        payload: teachers,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_TIMETABLE_TEACHERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getSchool = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: STUDENT_SCHOOL_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().studentLogin.token}`,
      },
    }

    const { data } = await axios.get(
      `${apiURL}/api/student/school`,
      config
    )

    dispatch({
      type: STUDENT_SCHOOL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: STUDENT_SCHOOL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getFinalMarks =
  (subjectID) => async (dispatch, getState) => {
    try {
      dispatch({
        type: STUDENT_FINAL_MARKS_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().studentLogin.token}`,
        },
      }

      const { data } = await axios.get(
        `${apiURL}/api/student/finalmarks/${subjectID}`,
        config
      )

      let finalMarkTermOne = {}
      let finalMarkTermTwo = {}

      for (let finalMark in data) {
        if (data[finalMark].term === 1) {
          finalMarkTermOne = data[finalMark]
        }
        if (data[finalMark].term === 2) {
          finalMarkTermTwo = data[finalMark]
        }
      }

      let finalMarks = {
        1: finalMarkTermOne,
        2: finalMarkTermTwo,
      }

      dispatch({
        type: STUDENT_FINAL_MARKS_SUCCESS,
        payload: finalMarks,
      })
    } catch (error) {
      dispatch({
        type: STUDENT_FINAL_MARKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
