const join = require('path').join;

module.exports = {
  development: {
    storage: join(__dirname, '..', 'db', 'dev.db.sqlite'),
    dialect: 'sqlite',
    logging: console.log,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
