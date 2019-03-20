const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")

const cohortRouter = require("./routers/cohorts/cohorts_router")
const studentRouter = require("./routers/students/students_router")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger("dev"))

server.use("/api/cohorts", cohortRouter)
server.use("/students", studentRouter)

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Lambda Cohorts/Students App")
})

module.exports = server
