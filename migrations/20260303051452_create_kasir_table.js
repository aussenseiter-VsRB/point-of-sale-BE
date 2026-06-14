/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('kasir').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('kasir', function(table) {
      table.increments('id').primary();
      table.uuid('user_id').notNullable().unique().references('id').inTable('users').onDelete('CASCADE');
      table.decimal('modal', 10, 2).notNullable().defaultTo(0);
      table.timestamps(true, true);
      table.timestamp('deleted_at').nullable();
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('kasir');
};
