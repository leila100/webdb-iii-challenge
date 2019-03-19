const express = require("express")
const router = express.Router()

const cohortDB = require("../data/cohorts/cohortDB")

router.get("/", (req, res) => {
  cohortDB
    .find()
    .then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json("Can fetch the cohorts information"))
})

module.exports = router
