const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    timezone: '+00:00',
    dateStrings: false
})

pool.on('connection', (connection) => {
    connection.query(`
        SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION';
    `)
})

module.exports = pool