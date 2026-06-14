require('dotenv').config()

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: '+00:00',
      dateStrings: false
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION';", (err) => {
          done(err, conn)
        })
      }
    }
  }
}