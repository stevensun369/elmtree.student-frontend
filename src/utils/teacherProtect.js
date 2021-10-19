export const protectTeacher = (subjectID, subjectList) => {
  var returnValue = false

  for (var subject in subjectList) {
    if (subjectList[subject].subjectID === subjectID) {
      returnValue = true
    }
  }

  return returnValue
}

export const protectTeacherStudentID = (studentID, subjectStudentsList) => {
  var returnValue = false

  for (var student in subjectStudentsList) {
    if (subjectStudentsList[student].studentID === studentID) {
      returnValue = true
    }
  }

  return returnValue
}
