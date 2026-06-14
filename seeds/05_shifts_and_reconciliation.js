const { v4: uuidv4 } = require('uuid')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const existingShifts = await knex('shifts').limit(1)
  if (existingShifts.length > 0) return

  const users = await knex('users').select('id', 'username', 'role')
  const kasirList = await knex('kasir').select('id', 'user_id')

  if (users.length === 0 || kasirList.length === 0) return

  const userMap = {}
  users.forEach(u => { userMap[u.username] = u })

  const adminId = userMap['admin'] ? userMap['admin'].id : users[0].id
  const userKasir1 = userMap['kasir1']
  const userKasir2 = userMap['kasir2']

  const kasir1 = kasirList.find(k => k.user_id === (userKasir1 ? userKasir1.id : null))
  const kasir2 = kasirList.find(k => k.user_id === (userKasir2 ? userKasir2.id : null))

  if (!kasir1 || !kasir2) return

  const closedShiftId = uuidv4()
  const openShiftId = uuidv4()

  await knex('shifts').insert([
    {
      id: closedShiftId,
      kasir_id: kasir1.id,
      opened_by: adminId,
      opened_at: knex.fn.now(),
      closed_at: knex.fn.now(),
      status: 'closed',
      deleted_at: null
    },
    {
      id: openShiftId,
      kasir_id: kasir2.id,
      opened_by: adminId,
      opened_at: knex.fn.now(),
      closed_at: null,
      status: 'open',
      deleted_at: null
    }
  ])

  await knex('cash_reconciliation').insert([
    {
      id: uuidv4(),
      shift_id: closedShiftId,
      kasir_id: kasir1.id,
      expected_cash: 68000.00,
      actual_cash: 70000.00,
      discrepancy: 2000.00,
      note: 'Shift ended, cash counted'
    }
  ])

  await knex('transaksi')
    .whereIn('id_kasir', [kasir1.id])
    .update({ shift_id: closedShiftId })
}
