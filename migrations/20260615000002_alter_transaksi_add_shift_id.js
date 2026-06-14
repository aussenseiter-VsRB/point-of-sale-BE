/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('transaksi');
  if (hasTable) {
    const hasColumn = await knex.schema.hasColumn('transaksi', 'shift_id');
    if (!hasColumn) {
      await knex.schema.alterTable('transaksi', function(t) {
        t.uuid('shift_id').nullable().references('id').inTable('shifts').onDelete('SET NULL');
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
    const hasColumn = await knex.schema.hasColumn('transaksi', 'shift_id');
    if (hasColumn) {
      await knex.schema.alterTable('transaksi', function(t) {
        t.dropForeign('shift_id');
        t.dropColumn('shift_id');
      });
    }
  }
};
