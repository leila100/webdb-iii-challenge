const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")

const cohortRouter = require("./cohorts/cohorts_router")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(logger("dev"))

server.use("/api/cohorts", cohortRouter)

server.get("/", (req, res) => {
  res.status(200).json("Welcome to Lambda Cohorts/Students App")
})

module.exports = server
