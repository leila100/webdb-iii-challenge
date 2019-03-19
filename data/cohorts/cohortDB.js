const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  find,
  findById,
  findStudentsById,
  insert,
  update
}

function find() {
  return db("cohorts")
}

function findById(id) {
  return db("cohorts")
    .where({ id: Number(id) })
    .first()
}

function findStudentsById(id) {
  return db("students").where({ cohort_id: Number(id) })
}

function insert(cohort) {
  return db("cohorts")
    .insert(cohort)
    .then(ids => ({ id: ids[0] }))
}

function update(id, cohort) {
  return db("cohorts")
    .where("id", Number(id))
    .update(cohort)
}
