const { hash } = require("bcrypt")
const { v4: uuidv4 } = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const hashedPassword = await hash('050208', 10)

  await knex('users')
    .insert([
      {
        id: uuidv4(),
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      },
      {
        id: uuidv4(),
        username: 'kasir1',
        password: hashedPassword,
        role: 'user'
      },
      {
        id: uuidv4(),
        username: 'kasir2',
        password: hashedPassword,
        role: 'user'
      }
    ])
    .onConflict('username')
    .ignore()
}
