const express = require("express")
const router = express.Router()

const studentDB = require("../../data/students/studentDB")

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

module.exports = router
