import {
  STUDENT_AVERAGE_MARKS_REQUEST,
  STUDENT_AVERAGE_MARKS_SUCCESS,
  STUDENT_AVERAGE_MARKS_FAIL,
} from '../constants/studentConstants'
import axios from 'axios'
import { apiURL } from '../env'

export const getAverageMarks = async (dispatch, getState) => {
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
          averageMarks[subjectIDList[subject]].push(data[averageMark])
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
