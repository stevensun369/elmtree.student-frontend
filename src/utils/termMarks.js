import {
  STUDENT_TERM_MARKS_REQUEST,
  STUDENT_TERM_MARKS_SUCCESS,
  STUDENT_TERM_MARKS_FAIL,
} from '../constants/studentConstants'
import axios from 'axios'
import { apiURL } from '../env'

export const getTermMarks = async (dispatch, getState) => {
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
      `${apiURL}/api/student/term`,
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
