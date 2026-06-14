/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('transaksi').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('transaksi', function(table) {
      table.uuid('id').primary();
      table.integer('id_kasir').unsigned().notNullable().references('id').inTable('kasir').onDelete('RESTRICT');
      table.decimal('total_harga', 10, 2).notNullable();
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
  return knex.schema.dropTableIfExists('transaksi')
};
