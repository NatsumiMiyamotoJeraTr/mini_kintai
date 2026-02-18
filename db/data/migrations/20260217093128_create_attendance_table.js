/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("attendances", function (table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.date("work_date").notNullable();
    table.timestamp("clock_in", { useTz: true }); // 2026-02-17 15:30:00+09:00 など、tz情報付き
    table.timestamp("clock_out", { useTz: true });
    table.integer("break_minutes").defaultTo(0);
    table.timestamps(true, true);
    table.unique(["user_id", "work_date"]); // 1ユーザ1日1記録に制限
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("attendances");
};
