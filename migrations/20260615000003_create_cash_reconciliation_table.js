/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('cash_reconciliation').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('cash_reconciliation', function(table) {
      table.uuid('id').primary();
      table.uuid('shift_id').notNullable().references('id').inTable('shifts').onDelete('CASCADE');
      table.integer('kasir_id').unsigned().notNullable().references('id').inTable('kasir').onDelete('RESTRICT');
      table.decimal('expected_cash', 15, 2).notNullable();
      table.decimal('actual_cash', 15, 2).notNullable();
      table.decimal('discrepancy', 15, 2).notNullable();
      table.text('note').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cash_reconciliation');
};
