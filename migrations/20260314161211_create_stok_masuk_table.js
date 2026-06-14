/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('stok_masuk').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('stok_masuk', function(table) {
      table.uuid('id').primary();
      table.uuid('id_produk').notNullable().references('id').inTable('produk').onDelete('CASCADE');
      table.uuid('id_user').nullable();
      table.integer('jumlah_beli').notNullable().defaultTo(0);
      table.integer('jumlah_satuan').notNullable().defaultTo(0);
      table.decimal('harga_beli', 10, 2).nullable();
      table.string('supplier').nullable();
      table.text('keterangan').nullable();
      table.timestamps(true, true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stok_masuk');
};
