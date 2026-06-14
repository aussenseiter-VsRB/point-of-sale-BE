/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const tablesToAlter = ['users', 'produk', 'kasir', 'transaksi', 'produk_barcode']
  
  for (const table of tablesToAlter) {
    const hasTable = await knex.schema.hasTable(table)
    if (hasTable) {
      await knex.schema.alterTable(table, function(t) {
        t.timestamp('deleted_at').nullable().alter()
      })
    }
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.resolve()
}
