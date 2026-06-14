/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('produk_barcode').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('produk_barcode', function(table) {
      table.uuid('id').primary();
      table.uuid('id_produk').notNullable().references('id').inTable('produk').onDelete('CASCADE');
      table.string('barcode').notNullable().unique();
      table.string('keterangan').nullable();
      table.string('satuan').nullable();
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
  return knex.schema.dropTableIfExists('produk_barcode');
};
