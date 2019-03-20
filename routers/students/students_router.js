const express = require("express")
const router = express.Router()

const studentDB = require("../../data/students/studentDB")
const cohortDB = require("../../data/cohorts/cohortDB")

router.get("/", (req, res) => {
  studentDB
    .find()
    .then(students => {
      res.status(200).json(students)
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The students information could not be retrieved." })
    )
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  studentDB
    .findById(id)
    .then(student => {
      if (student) {
        const cohortId = student.cohort_id
        let returnedStudent = {
          id: student.id,
          name: student.name,
          cohort: ""
        }
        cohortDB
          .findById(cohortId)
          .then(cohort => {
            if (cohort) {
              returnedStudent.cohort = cohort.name
            }
            res.status(200).json(returnedStudent)
          })
          .catch(err => console.log(err))
      } else
        res
          .status(400)
          .json({ errorMessage: "Please provide a valid id for the student." })
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The student information could not be retrieved." })
    )
})

router.post("/", (req, res) => {
  const studentInfo = req.body
  if (!studentInfo.name || !studentInfo.cohort_id) {
    res.status(400).json({
      errorMessage: "Please provide name and cohort_id for the student."
    })
  } else {
    // Check that the cohort id exist
    cohortDB
      .findById(studentInfo.cohort_id)
      .then(cohort => {
        if (cohort) {
          studentDB.insert(studentInfo).then(studentId => {
            res.status(201).json(studentId)
          })
        } else {
          res
            .status(400)
            .json({ errorMessage: "Please provide a valid id for the cohort." })
        }
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the student to the database"
        })
      )
  }
})

module.exports = router
