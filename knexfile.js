require("dotenv").config({ path: "./src/config/.env" });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
