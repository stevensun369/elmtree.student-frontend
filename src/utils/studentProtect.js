export const protectStudent = (subjectID, subjectList) => {
  var returnValue = false

  for (var subject in subjectList) {
    if (subjectList[subject].subjectID === subjectID) {
      returnValue = true
    }
  }

  return returnValue
}
