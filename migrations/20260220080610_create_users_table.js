/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */

exports.up = function(knex) {
    return knex.schema.hasTable('users').then(exists => {
        if (exists) return Promise.resolve();
        return knex.schema.createTable('users', function(table) {
            table.uuid('id').primary();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();
            table.string('role').defaultTo('user');
            table.timestamps(true, true);
            table.timestamp('deleted_at').nullable();
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
