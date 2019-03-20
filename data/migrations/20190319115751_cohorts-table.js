exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // Primary key called id, integer, autoincrements
    tbl.increments()

    tbl.string("name", 128).notNullable()
    tbl.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts")
}
