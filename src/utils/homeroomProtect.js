export const protectHomeroom = (homeroomGrade) => {
  if (homeroomGrade) {
    if (Object.keys(homeroomGrade).length !== 0) {
      return true
    } else if (Object.keys(homeroomGrade).length === 0) {
      return false
    }
  } else {
    return false
  }
}

export const protectHomeroomStudentID = (studentID, homeroomStudentsList) => {
  var returnValue = false
  for (var student in homeroomStudentsList) {
    if (homeroomStudentsList[student].studentID === studentID) {
      returnValue = true
    }
  }

  return returnValue
}

export const protectHomeroomSubjectID = (
  subjectID,
  homeroomStudentSubjectsList
) => {
  var returnValue = false

  for (var subject in homeroomStudentSubjectsList) {
    if (homeroomStudentSubjectsList[subject].subjectID === subjectID) {
      returnValue = true
    }
  }

  return returnValue
}
