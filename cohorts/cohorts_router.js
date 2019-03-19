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
  cohortDB
    .findById(req.params.id)
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

router.post("/", (req, res) => {
  const cohort = req.body
  if (!cohort.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name for the cohort." })
  } else {
    cohortDB
      .insert(cohort)
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
module.exports = router
