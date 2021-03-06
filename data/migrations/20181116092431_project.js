
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', tbl => {
      tbl
      .increments()
      .primary();

      tbl
      .string('name', 250)
      .notNullable();

      tbl
      .string('description', 1000)
      .notNullable();

      tbl
      .boolean('completed')
      .defaultTo(false);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects')
};
