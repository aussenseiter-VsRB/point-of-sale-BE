exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('produk')
  if (hasTable) {
    const hasColumn = await knex.schema.hasColumn('produk', 'discount_percent')
    if (!hasColumn) {
      await knex.schema.alterTable('produk', function(t) {
        t.decimal('discount_percent', 5, 2).notNullable().defaultTo(0)
      })
    }
  }
}

exports.down = async function(knex) {
  const hasTable = await knex.schema.hasTable('produk')
  if (hasTable) {
    const hasColumn = await knex.schema.hasColumn('produk', 'discount_percent')
    if (hasColumn) {
      await knex.schema.alterTable('produk', function(t) {
        t.dropColumn('discount_percent')
      })
    }
  }
}
