const { username, password, database, host } = require('./index').db;

module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": username,
    "password": password,
    "database": "database_test",
    "host": host,
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": username,
    "password": password,
    "database": "database_production",
    "host": host,
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
