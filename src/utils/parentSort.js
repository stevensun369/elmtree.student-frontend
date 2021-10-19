export const sortAverageMarks = (averageMarks) => {
  // 'item' can be subject or student
  var itemAverageMarks = {}

  for (var item in averageMarks) {
    itemAverageMarks[item] = []

    for (var itemAverageMark in averageMarks[item]) {
      if (averageMarks[item][itemAverageMark].term === 1) {
        itemAverageMarks[item][0] = averageMarks[item][itemAverageMark].value
      }

      if (averageMarks[item][itemAverageMark].term === 2) {
        itemAverageMarks[item][1] = averageMarks[item][itemAverageMark].value
      }
    }
  }

  return itemAverageMarks
}

export const sortStudentInfo = (students, studentID) => {
  var studentInfo = {}
  var authorized = false

  for (var student in students) {
    if (students[student].studentID === studentID) {
      studentInfo = students[student]
      authorized = true
    }
  }

  return { studentInfo, authorized }
}

export const sortSubjectInfo = (subjectList, subjectID) => {
  var subjectInfo = {}
  var subjectAuthorized = false

  for (var subject in subjectList) {
    if (subjectList[subject].subjectID === subjectID) {
      subjectInfo = subjectList[subject]
      subjectAuthorized = true
    }
  }

  return { subjectInfo, subjectAuthorized }
}

export const sortMarksByTerm = (marksList) => {
  var marksTermOne = []
  var marksTermTwo = []

  for (var mark in marksList) {
    if (marksList[mark].term === 1) {
      marksTermOne.push(marksList[mark])
    }

    if (marksList[mark].term === 2) {
      marksTermTwo.push(marksList[mark])
    }
  }

  return { marksTermOne, marksTermTwo }
}

export const sortTruancysByTerm = (truancysList) => {
  var truancysTermOne = []
  var truancysTermTwo = []

  for (var mark in truancysList) {
    if (truancysList[mark].term === 1) {
      truancysTermOne.push(truancysList[mark])
    }

    if (truancysList[mark].term === 2) {
      truancysTermTwo.push(truancysList[mark])
    }
  }

  return { truancysTermOne, truancysTermTwo }
}

export const sortAverageMarksByTerm = (averageMarksList) => {
  var averageMarkTermOne
  var averageMarkTermTwo

  for (var averageMark in averageMarksList) {
    if (averageMarksList[averageMark].term === 1) {
      averageMarkTermOne = averageMarksList[averageMark].value
    }

    if (averageMarksList[averageMark].term === 2) {
      averageMarkTermTwo = averageMarksList[averageMark].value
    }
  }

  return { averageMarkTermOne, averageMarkTermTwo }
}
