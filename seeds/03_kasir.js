/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const existingKasir = await knex('kasir').limit(1)
  if (existingKasir.length > 0) return

  const users = await knex('users').select('id', 'username')
  const userMap = {}
  users.forEach(u => { userMap[u.username] = u.id })

  await knex('kasir').insert([
    {
      user_id: userMap['kasir1'],
      modal: 500000.00
    },
    {
      user_id: userMap['kasir2'],
      modal: 750000.00
    }
  ])
}
