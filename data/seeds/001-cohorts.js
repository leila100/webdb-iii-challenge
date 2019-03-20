exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "WEBPT3" },
        { name: "CS5" },
        { name: "WEBPT2" }
      ])
    })
}
