/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('transaksi');
  if (hasTable) {
    const hasColumn = await knex.schema.hasColumn('transaksi', 'discount_amount');
    if (!hasColumn) {
      await knex.schema.alterTable('transaksi', function(t) {
        t.decimal('discount_amount', 15, 2).nullable().defaultTo(0);
        t.text('discount_reason').nullable();
        t.uuid('discount_approved_by').nullable().references('id').inTable('users').onDelete('SET NULL');
      });
    }
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  const hasTable = await knex.schema.hasTable('transaksi');
  if (hasTable) {
    const hasColumn = await knex.schema.hasColumn('transaksi', 'discount_amount');
    if (hasColumn) {
      await knex.schema.alterTable('transaksi', function(t) {
        t.dropForeign('discount_approved_by');
        t.dropColumn('discount_amount');
        t.dropColumn('discount_reason');
        t.dropColumn('discount_approved_by');
      });
    }
  }
};
