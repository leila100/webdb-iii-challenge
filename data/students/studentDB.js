const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
}

function find() {
  return db("students")
}

function insert(student) {
  return db("students")
    .insert(student)
    .then(ids => ({ id: ids[0] }))
}

function findById(id) {
  return db
    .select(
      "students.id as id",
      "students.name as name",
      "cohorts.name as cohort"
    )
    .from("students")
    .where("students.id", Number(id))
    .join("cohorts", { "students.cohort_id": "cohorts.id" })
    .first()
}

function update(id, student) {
  return db("students")
    .where("id", Number(id))
    .update(student)
}

function remove(id) {
  return db("students")
    .where("id", Number(id))
    .del()
}
