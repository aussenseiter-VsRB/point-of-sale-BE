exports.up = function(knex) {
  return knex.schema.hasTable('password_history').then(exists => {
    if (exists) return Promise.resolve();
    return knex.schema.createTable('password_history', function(table) {
      table.uuid('id').primary();
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.uuid('changed_by').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('password_history');
};
