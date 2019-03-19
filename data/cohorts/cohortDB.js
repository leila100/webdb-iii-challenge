const knex = require("knex")
const knexConfig = require("../../knexfile.js")
const db = knex(knexConfig.development)

module.exports = {
  find,
  findById,
  insert
}

function find() {
  return db("cohorts")
}

function findById(id) {
  return db("cohorts")
    .where({ id: Number(id) })
    .first()
}

function insert(cohort) {
  return db("cohorts")
    .insert(cohort)
    .then(ids => ({ id: ids[0] }))
}
