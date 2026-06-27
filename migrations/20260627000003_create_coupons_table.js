exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('coupons');
  if (!hasTable) {
    await knex.schema.createTable('coupons', function(t) {
      t.uuid('id').primary();
      t.string('code', 100).notNullable().unique();
      t.decimal('discount_amount', 15, 2).notNullable();
      t.text('description').nullable();
      t.boolean('is_active').defaultTo(true);
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.timestamp('deleted_at').nullable();
    });
  }
  const hasCouponCol = await knex.schema.hasColumn('transaksi', 'coupon_id');
  if (!hasCouponCol) {
    await knex.schema.alterTable('transaksi', function(t) {
      t.uuid('coupon_id').nullable().references('id').inTable('coupons').onDelete('SET NULL');
    });
  }
};

exports.down = async function(knex) {
  const hasCouponCol = await knex.schema.hasColumn('transaksi', 'coupon_id');
  if (hasCouponCol) {
    await knex.schema.alterTable('transaksi', function(t) {
      t.dropForeign('coupon_id');
      t.dropColumn('coupon_id');
    });
  }
  await knex.schema.dropTableIfExists('coupons');
};
