const dotenv = require("dotenv");
dotenv.config();

const { MYSQL_SERVER, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } =
  process.env || {};

module.exports = {
  development: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_SERVER,
    port: MYSQL_PORT,
    dialect: "mariadb",
    logging: false,
  },
  test: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_SERVER,
    port: MYSQL_PORT,
    dialect: "mariadb",
  },
  production: {
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    host: MYSQL_SERVER,
    port: MYSQL_PORT,
    dialect: "mariadb",
  },
};
