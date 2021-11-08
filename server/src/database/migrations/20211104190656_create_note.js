exports.up = function(knex) {
  return knex.schema.createTable("notes", (table) => {
    table.increments("id").primary();
    table.date("date").defaultTo(knex.fn.now());
    table.string("text").notNullable();

    table.integer("board_id")
      .references("boards.id")
      .onDelete("CASCADE")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("notes");
};
