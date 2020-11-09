module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "Todos-local",
    "host": "127.0.0.1",
    "dialect": "postgresql"
  },
  "production": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgresql"
  }
}
