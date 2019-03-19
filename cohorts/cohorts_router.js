const express = require("express")
const router = express.Router()

const cohortDB = require("../data/cohorts/cohortDB")

router.get("/", (req, res) => {
  cohortDB
    .find()
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The cohorts information could not be retrieved." })
    )
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  cohortDB
    .findById(id)
    .then(cohort => {
      if (cohort) res.status(200).json(cohort)
      else
        res
          .status(400)
          .json({ errorMessage: "Please provide a valid id for the cohort." })
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The cohort information could not be retrieved." })
    )
})

router.get("/:id/students", (req, res) => {
  // Check to be sure the cohort exist first
  const { id } = req.params
  cohortDB
    .findById(id)
    .then(cohort => {
      if (cohort) {
        cohortDB.findStudentsById(id).then(students => {
          if (students.length > 0) res.status(200).json(students)
          else
            res.status(400).json({
              errorMessage: "There are no students attending this cohort."
            })
        })
      } else
        res
          .status(400)
          .json({ errorMessage: "Please provide a valid id for the cohort." })
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The cohort information could not be retrieved." })
    )
})

router.post("/", (req, res) => {
  const cohortInfo = req.body
  if (!cohortInfo.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name for the cohort." })
  } else {
    cohortDB
      .insert(cohortInfo)
      .then(cohortId => {
        res.status(201).json(cohortId)
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the cohort to the database"
        })
      )
  }
})

router.put("/:id", (req, res) => {
  const cohortInfo = req.body
  const { id } = req.params
  // Check to be sure the data is valid
  if (!cohortInfo.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name for the cohort." })
  } else {
    cohortDB
      .update(id, cohortInfo)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count)
        } else {
          res
            .status(400)
            .json({ errorMessage: "Please provide a valid id for the cohort." })
        }
      })
      .catch(err => {
        res
          .status(500) // 500: Server Error
          .json({ error: "The cohort information could not be modified." })
      })
  }
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  cohortDB
    .remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count)
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide a valid id for the cohort." })
      }
    })
    .catch(err =>
      res
        .status(500) // 500: Server Error
        .json({ error: "The cohort could not be removed" })
    )
})

module.exports = router
