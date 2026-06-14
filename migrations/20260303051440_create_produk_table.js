const { TableBuilder } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('produk').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('produk', function(table) {
      table.uuid('id').primary();
      table.string('barcode').notNullable().unique();
      table.string('nama_produk').notNullable();
      table.decimal('harga', 10, 2).notNullable();
      table.integer('stok').notNullable().defaultTo(0);
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
  return knex.schema.dropTableIfExists('produk')
};
