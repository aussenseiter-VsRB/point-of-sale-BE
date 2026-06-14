/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('item_transaksi').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('item_transaksi', function(table) {
      table.uuid('id').primary();
      table.uuid('id_transaksi').notNullable().references('id').inTable('transaksi').onDelete('CASCADE');
      table.uuid('id_produk').notNullable().references('id').inTable('produk').onDelete('CASCADE');
      table.integer('jumlah').notNullable();
      table.decimal('harga', 10, 2).notNullable();
      table.timestamps(true, true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item_transaksi');
};
