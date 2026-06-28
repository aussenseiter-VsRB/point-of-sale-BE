const db = require('../config/db')

exports.findAll = async () => {
    const [rows] = await db.query(
        'SELECT id, username, role FROM users'
    )

    return rows
}

exports.findById = async (id) => {
    const [rows] = await db.query(
        'SELECT id, username, role FROM users WHERE id = ?',
        [id]
    )

    return rows[0]
}

exports.findByIdWithPassword = async (id) => {
    const [rows] = await db.query(
        'SELECT id, username, password, role FROM users WHERE id = ?',
        [id]
    )

    return rows[0]
}

exports.updatePassword = async (id, hashedPassword) => {
    await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, id]
    )
}

exports.softDelete = async (id) => {
    await db.query(
        'UPDATE users SET deleted_at = NOW() WHERE id = ?',
        [id]
    )
}

exports.updateUsername = async (id, username) => {
    await db.query(
        'UPDATE users SET username = ? WHERE id = ?',
        [username, id]
    )
}

exports.findByUsername = async (username) => {
    const [rows] = await db.query(
        'SELECT id, username, password, role FROM users WHERE username = ?',
        [username]
    )

    return rows[0]
}

exports.create = async (data) => {
    const { id, username, password, role } = data

    await db.query(
        'INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
        [id, username, password, role]
    )
}