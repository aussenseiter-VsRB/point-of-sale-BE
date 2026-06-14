/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('shifts').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('shifts', function(table) {
      table.uuid('id').primary();
      table.integer('kasir_id').unsigned().notNullable().references('id').inTable('kasir').onDelete('RESTRICT');
      table.uuid('opened_by').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      table.timestamp('opened_at').defaultTo(knex.fn.now());
      table.timestamp('closed_at').nullable();
      table.enu('status', ['open', 'closed']).defaultTo('open');
      table.timestamp('deleted_at').nullable();
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('shifts');
};
