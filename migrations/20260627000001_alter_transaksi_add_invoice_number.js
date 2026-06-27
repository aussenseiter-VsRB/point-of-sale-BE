exports.up = function(knex) {
  return knex.schema.hasColumn('transaksi', 'invoice_number').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.table('transaksi', function(table) {
      table.string('invoice_number', 50).nullable().after('id');
    });
  });
};

exports.down = function(knex) {
  return knex.schema.table('transaksi', function(table) {
    table.dropColumn('invoice_number');
  });
};
