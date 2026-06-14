/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('void_log').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('void_log', function(table) {
      table.uuid('id').primary();
      table.uuid('transaksi_id').notNullable().references('id').inTable('transaksi').onDelete('CASCADE');
      table.uuid('voided_by').notNullable().references('id').inTable('users').onDelete('RESTRICT');
      table.text('reason').notNullable();
      table.timestamp('voided_at').defaultTo(knex.fn.now());
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('void_log');
};
